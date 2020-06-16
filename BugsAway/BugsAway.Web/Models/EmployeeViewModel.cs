using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace BugsAway.Web.Models
{
    public class EmployeeViewModel
    {       

        HttpClient client;

        public EmployeeViewModel(int id)
        {
            Employee = GetEmployeeAsync(id).GetAwaiter().GetResult();
        }

        public EmployeeModel Employee { get; set; }

        async Task<EmployeeModel> GetEmployeeAsync(int id)
        {
            var path = $"Employees/{id}";
            client = new HttpClient();
            client.BaseAddress = new Uri("https://api.bugsaway.bryanyeo.dev/api/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));


            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var jsonResult = JsonDocument.Parse(result);
                JsonElement jsonElement = jsonResult.RootElement.Clone();


                EmployeeModel emp = new EmployeeModel{
                    EmployeeId = jsonElement.GetProperty("employeeId").GetInt32(),
                    Name = jsonElement.GetProperty("name").GetString(),
                    RoleId = jsonElement.GetProperty("roleId").GetInt32()

                };

                return emp;
            }

            return null;
        }
    }
}
