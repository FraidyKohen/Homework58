using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Homework58.dataproject;

namespace Homework58.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [Route("getPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addPerson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }


        [HttpPost]
        [Route("editPerson")]
        public void EditPerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.EditPerson(person);
        }


        [HttpPost]
        [Route("deletePerson")]
        public void DeletePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(person.Id);
        }

        [HttpPost]
        [Route("deletePeople")]
        public void DeletePeople(int[] ids)
        {
            var repo = new PersonRepository(_connectionString);
            List<int> idsList = new List<int>();
            for (int i = 0; i < ids.Length; i++)
            {
                idsList.Add(ids[i]);
            }
            repo.DeletePeople(idsList);
        }

        [HttpPost]
        [Route("deleteAllPeople")]
        public void DeleteAllPeople()
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAllPeople();
        }

    }
}
