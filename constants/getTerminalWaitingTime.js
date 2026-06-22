
import { terminalName } from './terminalNameWithDefaultTime'
import moment from 'moment'
import appconstants from "../constants/appconstants";

const getTimeFromStaticArray = (terminalData) => {
    // console.log(terminalData)
    var waitingTime = parseInt(terminalData?.avg_total_stopage_time_in_minutes)
    for (let i in terminalName) {
        if (terminalName[i].category === terminalData?.terminal_category) {
            waitingTime = terminalName[i].waitTime
        }
    }
    return waitingTime
}

export function getTerminalWaitingTime(terminalData) {
    // terminalData.avg_total_stopage_time_in_minutes = 0.1
    if (parseInt(terminalData?.avg_total_stopage_time_in_minutes) > 0) {
        return parseInt(terminalData?.avg_total_stopage_time_in_minutes)
    } else {
        if (terminalData?.is24Available || (terminalData?.close_time === null && terminalData?.open_time === null)) {
            return getTimeFromStaticArray(terminalData)
        } else {
            if (terminalData?.total_users > 0) {
                return getTimeFromStaticArray(terminalData)
            }
            else {
                // let openTime=moment(terminalData?.open_time).utcOffset(appconstants.appConstants.timeZoneUsa).format('HH:mm')
                let openTime = moment(terminalData?.open_time).utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
                let closeTime = moment(terminalData?.close_time).utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
                let currentTime = moment().utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
                let isTimeExist = moment(currentTime, 'HH:mm').isBetween(moment(openTime, "hh:mm A"), moment(closeTime, 'hh:mm A'))
                if (isTimeExist) {
                    return getTimeFromStaticArray(terminalData)
                }
                else {
                    return parseInt(terminalData?.avg_total_stopage_time_in_minutes)
                }
            }
        }
    }
}

export function getClosingSoonCheck(terminalData) {
    if (terminalData?.is24Available) {
        return false
    } else {
        // let openTime=moment(terminalData?.close_time).subtract(60, 'minutes').utcOffset(appconstants.appConstants.timeZoneUsa).format('HH:mm')
        // let closeTime=moment(terminalData?.close_time).utcOffset(appconstants.appConstants.timeZoneUsa).format('HH:mm')
        // let currentTime=moment().utcOffset(appconstants.appConstants.timeZoneUsa).format('HH:mm')
        // let isTimeExist=moment(currentTime,'HH:mm').isBetween(moment(openTime,'HH:mm'),moment(closeTime,'HH:mm'))
        let openTime = moment(terminalData?.close_time).subtract(60, 'minutes').utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
        let closeTime = moment(terminalData?.close_time).utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
        let currentTime = moment().utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
        let isTimeExist = moment(currentTime, 'hh:mm A').isBetween(moment(openTime, "hh:mm A"), moment(closeTime, 'hh:mm A'))
        // console.log(isTimeExist)
        return isTimeExist
    }
}


export function getCurrentUser(terminalData, totalUser) {
    // console.log(terminalData, totalUser)
    if (totalUser > 0) {
        return Number(totalUser) + 100
    }
    else {
        if (terminalData?.is24Available || (terminalData?.open_time == null && terminalData?.close_time == null)) {
            return 100
        } else {

            let openTime = moment(terminalData?.open_time).utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
            let closeTime = moment(terminalData?.close_time).utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
            let currentTime = moment().utcOffset(appconstants.appConstants.timeZoneUsa).format("hh:mm A")
            let isTimeExist = moment(currentTime, 'HH:mm').isBetween(moment(openTime, "hh:mm A"), moment(closeTime, 'hh:mm A'))
            //   let openTime= moment(
            //         moment(new Date()).format("YYYY-MM-DDT") +
            //         terminalData?.open_time?.split("T")[1]
            //       ).format("HH:mm")
            //     let closeTime=moment(
            //         moment(new Date()).format("YYYY-MM-DDT") +
            //         terminalData?.close_time?.split("T")[1]
            //       ).format("HH:mm")
            //     let currentTime=moment().format('HH:mm')
            //     let isTimeExist=moment(currentTime,'HH:mm').isBetween(moment(openTime,'HH:mm'),moment(closeTime,'HH:mm'))
            if (isTimeExist) {
                return 100
            }
            else {
                // console.log("terminalData.avg_total_stopage_time_in_minutes",terminalData?.avg_total_stopage_time_in_minutes);
                return '0'
            }
        }
    }
}
