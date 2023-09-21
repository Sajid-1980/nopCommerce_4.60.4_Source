using System;
using FluentMigrator;
using Nop.Core.Domain.Logging;
using Nop.Data.Extensions;
using Nop.Data.Migrations;
using Nop.Plugin.Payments.PayPalStandard.Domain;
 
namespace Nop.Plugin.Payments.PayPalStandard.Data
{
    [NopMigration("2023/09/20 10:47:00", "Payments.PayPalStandard base schema" )]
    public class SchemaMigration : AutoReversingMigration
    {
        public override void Up()
        {
             
           Create.TableFor<CustomProduct>();
            
        }


    }
}