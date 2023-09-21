using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nop.Data;
using Nop.Plugin.Payments.PayPalStandard.Domain;

namespace Nop.Plugin.Payments.PayPalStandard.Services
{

    public class CustomProductService
    { 
        private readonly IRepository<CustomProduct> _repository;
  
        public CustomProductService(IRepository<CustomProduct> repository)
        {
           _repository = repository;
        }

        public async Task<List<CustomProduct>> GetAllDataAsync()
        {
            return await _repository.Table.ToListAsync();
        }

    }
}