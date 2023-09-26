using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Nop.Core;
using Nop.Core.Domain.Orders;
using Nop.Plugin.Payments.PayPalStandard.Components;
using Nop.Services.Cms;
using Nop.Services.Payments;
using Nop.Services.Plugins;
using Nop.Web.Framework.Infrastructure;

namespace Nop.Plugin.Payments.PayPalStandard
{
    public class PayProcessor : BasePlugin, IWidgetPlugin  
    {
        private readonly IWebHelper _webHelper;

        public PayProcessor(IWebHelper webHelper)
        {
            _webHelper = webHelper;
        }

        public bool HideInWidgetList => false;

        public override string GetConfigurationPageUrl()
        {

            return $"{_webHelper.GetStoreLocation()}Admin/PaymentPayPalStandard/Configure";

        }

        public Type GetWidgetViewComponent(string widgetZone)
        {
            return typeof(PaymentsPayPalViewComponent);
        }

        public Task<IList<string>> GetWidgetZonesAsync()
        {
            return Task.FromResult<IList<string>>(new List<string> { PublicWidgetZones.HeaderMenuAfter });
        }

        public override async Task InstallAsync()
        {
            await base.InstallAsync();      
        }
        public override async Task UninstallAsync()
        {
            await base.UninstallAsync();
        }

        
    }
}