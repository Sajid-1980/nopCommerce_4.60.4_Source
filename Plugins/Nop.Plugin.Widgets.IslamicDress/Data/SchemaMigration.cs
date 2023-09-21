using FluentMigrator;
using Nop.Data.Extensions;
using Nop.Data.Migrations;
using Nop.Plugin.Widgets.IslamicDress.Domain;

namespace Nop.Plugin.Widgets.IslamicDress.Data
{
    [NopMigration("2023/09/21 11:05:00", "Widgets.IslamicDress base schema")]
    public class SchemaMigration : AutoReversingMigration
    {
        public override void Up()
        {
             
           Create.TableFor<IslamicDressData>();
            
        }


    }
}