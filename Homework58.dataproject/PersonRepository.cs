using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework58.dataproject
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople ()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public Person GetPersonById(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void AddPerson (Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void EditPerson (Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            var personToEdit = context.People.FirstOrDefault(p => p.Id == person.Id);
            if (personToEdit != null)
            {
                context.Entry(personToEdit).CurrentValues.SetValues(person);
                context.SaveChanges() ;
            }
        }

        public void DeletePerson (int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            context.SaveChanges();
        }

        public void DeleteAllPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People");
            context.SaveChanges();
        }

        public void DeletePeople(List<int> idsList)
        {
            using var context = new PeopleDbContext(_connectionString);
            var peopleToDelete = context.People.Where(p => idsList.Contains(p.Id));
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }

    }
}
