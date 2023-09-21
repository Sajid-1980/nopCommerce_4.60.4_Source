//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc.Controllers;
//using Microsoft.AspNetCore.Mvc.Filters;

//namespace Nop.Plugin.Payments.PayPalStandard.Filters
//{
//    public class EditableWidgetPageFilter : IActionFilter
//    {
//        public void OnActionExecuted(ActionExecutedContext context)
//        {


//        }

//        public void OnActionExecuting(ActionExecutingContext filterContext)
//        {
//            if (filterContext == null || filterContext.HttpContext == null)
//                return;

//            string controllerName = filterContext?.Controller.ToString();
//            if (string.IsNullOrEmpty(controllerName))
//                return;

//            var actionDescriptor = filterContext.ActionDescriptor as ControllerActionDescriptor;
//            string actionName = actionDescriptor?.ActionName;
//            if (string.IsNullOrEmpty(actionName))
//                return;

//            if (((actionDescriptor.ActionName.Equals("PtxInfo", StringComparison.InvariantCultureIgnoreCase) ||
//                actionDescriptor.ActionName.Equals("Info", StringComparison.InvariantCultureIgnoreCase)) ||
//                (controllerName.Equals("Nop.Web.Areas.Admin.Controllers.CustomerController", StringComparison.InvariantCultureIgnoreCase) ||
//                controllerName.Equals("PTX.Nop.Plugin.Custom.Controllers.Admin.PTXCustomerController", StringComparison.InvariantCultureIgnoreCase) &&
//                actionDescriptor.ActionName.Equals("Edit", StringComparison.InvariantCultureIgnoreCase))) &&
//                filterContext.HttpContext.Request.Method == "POST")
//            {
//                var customerEmail = filterContext.HttpContext.Request.Form["Email"];
//                if (string.IsNullOrEmpty(customerEmail))
//                    return;

//                var customer = _customerService.GetCustomerByEmail(customerEmail);
//                if (customer == null)
//                    return;

//                var contactRequest = _activeCampaignHttpClient.PrepareActiveCampaignContactRequest(customer);
//                _activeCampaignHttpClient.ActiveCampaignUpdateContact(contactRequest, customer);
//            }
//    }
//}
 