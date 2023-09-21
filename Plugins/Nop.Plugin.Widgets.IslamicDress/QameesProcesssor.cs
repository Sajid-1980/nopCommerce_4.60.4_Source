using Nop.Core.Infrastructure;
using Nop.Core;
using Nop.Services.Cms;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Media;
using Nop.Services.Plugins;

namespace Nop.Plugin.Widgets.IslamicDress
{
    public class QameesProcesssor : BasePlugin, IWidgetPlugin
    {
        
        private readonly IWebHelper _webHelper;
       
        public QameesProcesssor(IWebHelper webHelper)
        {
            
            _webHelper = webHelper;
            
        }
        public bool HideInWidgetList => throw new NotImplementedException();

        public Type GetWidgetViewComponent(string widgetZone)
        {
            throw new NotImplementedException();
        }

        public Task<IList<string>> GetWidgetZonesAsync()
        {
            throw new NotImplementedException();
        }

        public override string GetConfigurationPageUrl()
        {
            return _webHelper.GetStoreLocation() + "Admin/WidgetsQamees/Configure";
        }

    }
}