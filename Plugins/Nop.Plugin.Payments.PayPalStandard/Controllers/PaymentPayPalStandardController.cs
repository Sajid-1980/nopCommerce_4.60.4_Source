using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nop.Plugin.Payments.PayPalStandard.Models;
using Nop.Plugin.Payments.PayPalStandard.Services;
using Nop.Web.Framework;
using Nop.Web.Framework.Controllers;
using Nop.Web.Framework.Mvc.Filters;

namespace Nop.Plugin.Payments.PayPalStandard.Controllers
{
    [Area(AreaNames.Admin)]
    [AutoValidateAntiforgeryToken]
    [ValidateIpAddress]
    [AuthorizeAdmin]
    public class PaymentPayPalStandardController : BasePluginController
    {
        private readonly CustomProductService _customProductService;
        public PaymentPayPalStandardController(CustomProductService customProductService)
        {
            _customProductService = customProductService;
        }
        public async Task<IActionResult> Configure()
        {
            var customProducts = await _customProductService.GetAllDataAsync();

             var model = new ConfigureModel
            {
                CustomProducts = customProducts,
               
            };

            return View("~/Plugins/Payments.PayPalStandard/Views/Configure.cshtml", model);
        }

        public async Task<IActionResult> Index()
        {
             

            return View("~/Plugins/Payments.PayPalStandard/Views/Home.cshtml");
        }
    }
}