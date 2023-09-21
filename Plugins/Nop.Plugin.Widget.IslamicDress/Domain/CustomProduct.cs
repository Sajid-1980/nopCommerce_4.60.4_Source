using System;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Nop.Core;

namespace Nop.Plugin.Payments.PayPalStandard.Domain
{

    public class CustomProduct : BaseEntity
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        /// <summary>
        /// Gets or sets an operation type identifier
        /// </summary>
        public int OperationTypeId { get; set; }



        /// <summary>
        /// Gets or sets an operation type
        /// </summary>
        public OperationType OperationType
        {
            get => (OperationType)OperationTypeId;
            set => OperationTypeId = (int)value;
        }

    }
}