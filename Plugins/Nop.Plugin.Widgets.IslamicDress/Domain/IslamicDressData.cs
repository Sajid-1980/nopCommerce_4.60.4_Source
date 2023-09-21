using System;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Nop.Core;

namespace Nop.Plugin.Widgets.IslamicDress.Domain
{

    public class IslamicDressData : BaseEntity
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
      
        
    }
}