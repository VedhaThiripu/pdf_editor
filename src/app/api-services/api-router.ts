/**
 * API ROUTING
 * @author parthiban
 * @param 
 * Module name : object
 * url : string
 * method : string
 * 
 */

import { environment } from "src/environments/environment"

export const API_ROUTER = {
    LIST_LOG: "LogAdd/get_all",
    LIST_CATEGORY: "LogAdd/get_cats",
    FILE_UPLOAD: "LogAdd/insert_log",
    DELETE_LOG: "LogAdd/delete_one",
    CRON_LIST: "CronFiles/get_all",
    CRON_ADD: "CronFiles/insert_data",
    CRON_STATUS: "LogShow/getCron",
    CRON_FILE_UPDATE: "CronFiles/update_data",
    CRON_UPDATE: "CronExec/add_log",
    LIST_CATEGORY_OPT: "LogShow/get_types",
    GET_DETAILS:"LogAdd/get_details"
    // LOG_DETAILS : "LogShow/getData/{id}"
}

export const SPINNER_BLOCK_API = [
    environment.BASE_API_URL[0] + 'users'
]