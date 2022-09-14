import Model from '../core/Model'
import { getTableFromEnv } from '../services/utils'

export default class Employed extends Model {
    constructor() {
        const fillables = ["employed_name", "employed_age", "employed_role"]
        const rules = {
            "employed_name": "required",
            "employed_age": "required|number",
            "employed_role": "required"
        }
        super(getTableFromEnv(), rules, fillables)
    }
}