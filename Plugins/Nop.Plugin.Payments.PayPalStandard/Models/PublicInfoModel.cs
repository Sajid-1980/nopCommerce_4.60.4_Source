using Nop.Web.Framework.Models;

namespace Nop.Plugin.Payments.PayPalStandard.Models
{
    public record PublicInfoModel : BaseNopModel
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
    }
}