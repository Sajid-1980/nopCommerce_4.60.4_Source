using Nop.Data;
using Nop.Plugin.Widgets.IslamicDress.Domain;

namespace Nop.Plugin.Widgets.IslamicDress.Services
{

    public class QameesService
    { 
        private readonly IRepository<IslamicDressData> _repository;
  
        public QameesService(IRepository<IslamicDressData> repository)
        {
           _repository = repository;
        }

        public async Task<List<IslamicDressData>> GetAllDataAsync()
        {
            return await _repository.Table.ToListAsync();
        }

    }
}