using Microsoft.AspNetCore.Mvc;
using Nop.Plugin.Widgets.IslamicDress.Models;
using Nop.Plugin.Widgets.IslamicDress.Services;
using Nop.Web.Framework;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Mvc.Filters;

namespace Nop.Plugin.Widgets.IslamicDress.Controllers
{
    [Area(AreaNames.Admin)]
    [AutoValidateAntiforgeryToken]
    [ValidateIpAddress]
    [AuthorizeAdmin]
    public class WidgetsQameesController : BasePluginController
    {
        private readonly QameesService _customProductService;
        public WidgetsQameesController(QameesService customProductService)
        {
            _customProductService = customProductService;
        }
        public async Task<IActionResult> Configure()
        {
            var customProducts = await _customProductService.GetAllDataAsync();

             var model = new ConfigureModel
            {
                IslamicDressDatas = customProducts,
               
            };

            return View("~/Plugins/Widgets.IslamicDress/Views/Configure.cshtml", model);
        }
    }
}