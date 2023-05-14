using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework58.data
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
    }
}
