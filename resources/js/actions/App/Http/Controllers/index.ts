import ExpenseController from './ExpenseController'
import IncomeController from './IncomeController'
import CategoryController from './CategoryController'
import Settings from './Settings'
const Controllers = {
    ExpenseController: Object.assign(ExpenseController, ExpenseController),
IncomeController: Object.assign(IncomeController, IncomeController),
CategoryController: Object.assign(CategoryController, CategoryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers