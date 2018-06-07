const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const config = require("../config/config")
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.pass,
  config.db.options
)

db.actions = require('../models/actions.js')(sequelize, Sequelize);
db.benefits = require('../models/benefits.js')(sequelize, Sequelize);
db.inventory = require('../models/inventory.js')(sequelize, Sequelize);
db.item_log = require('../models/item_log.js')(sequelize, Sequelize);
db.items = require('../models/items.js')(sequelize, Sequelize);
db.projects = require('../models/projects.js')(sequelize, Sequelize);
db.suppliers = require('../models/suppliers.js')(sequelize, Sequelize);
db.users = require('../models/users.js')(sequelize, Sequelize);
db.user_permissions = require('../models/user_permissions.js')(sequelize, Sequelize);
db.worker_attendance = require('../models/worker_attendance.js')(sequelize, Sequelize);
db.worker_benefits = require('../models/worker_benefits.js')(sequelize, Sequelize);
db.worker_projects = require('../models/worker_projects.js')(sequelize, Sequelize);
db.worker_salary = require('../models/worker_salary.js')(sequelize, Sequelize);
db.workers = require('../models/workers.js')(sequelize, Sequelize);

db.worker_projects.belongsTo(db.workers, { foreignKey: { name: 'worker_id', allowNull: false }})
db.worker_projects.belongsTo(db.projects, { foreignKey: { name: 'project_id', allowNull: false }})
db.worker_salary.belongsTo(db.workers, { foreignKey: { name: 'worker_id', allowNull: false } })
db.worker_attendance.belongsTo(db.workers, { foreignKey: { name: 'worker_id', allowNull: false } })
db.worker_attendance.belongsTo(db.projects, { foreignKey:{ name: 'project_id', allowNull: false } })
db.worker_attendance.belongsTo(db.actions, { foreignKey:{ name: 'action_id', allowNull: false }})
db.worker_benefits.belongsTo(db.workers, { foreignKey: { name: 'worker_id', allowNull: false }})
db.worker_benefits.belongsTo(db.benefits, { foreignKey: { name: 'benefit_id', allowNull: false }})
db.inventory.belongsTo(db.items, { foreignKey:  { name: 'item_id', allowNull: false }})
db.item_log.belongsTo(db.items, { foreignKey: { name: 'item_id', allowNull: false } })
db.item_log.belongsTo(db.actions, { foreignKey: { name: 'action_id', allowNull: false } })
db.item_log.belongsTo(db.projects, { foreignKey: { name: 'project_id', allowNull: false } })
db.item_log.belongsTo(db.suppliers, { foreignKey: { name: 'supplier_id', allowNull: false } })
db.user_permissions.belongsTo(db.users, { foreignKey: { name: 'user_id', allowNull: false } })

db.users.hasMany(db.user_permissions, { foreignKey: 'user_id', as: 'permissions' })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
