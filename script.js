let list = document.createElement('ul');
document.body.appendChild(list);
let list2 = document.createElement('ul');
document.body.appendChild(list2);
let list3 = document.createElement('ul');
document.body.appendChild(list3);

function convertTime(time) {
    let hours = Math.trunc(time);
    let minutes = (time % 1).toFixed(2) * 60;
    return moment(`Mon 03-Jul-2017, ${hours}:${minutes}`, 'ddd DD-MMM-YYYY, hh:mm').format('hh:mm A');
}
function parseObj(source, list) {
    let dayList = [];
    let timeValue = `${convertTime(source.days[source.order[0]].start)} - ${convertTime(source.days[source.order[0]].end)}`;
    let resultList = [];
    source.order.forEach((element, index) => {
        if (source.days[element] != undefined) {
            if (timeValue == `${convertTime(source.days[element].start)} - ${convertTime(source.days[element].end)}`) {
                dayList.push(element);
            }
            else {
                if (dayList.length == 1) {
                    resultList.push(`${dayList[0].substr(0,3)}:${timeValue}`);
                }
                else {
                    resultList.push(`${dayList[0].substr(0,3)}-${dayList[dayList.length - 1].substr(0,3)}:${timeValue}`);
                }
                dayList = [];
                dayList.push(element);
                timeValue = `${convertTime(source.days[element].start)} - ${convertTime(source.days[element].end)}`;
            }
        }
        if (index == source.order.length - 1 || source.days[element] == undefined) {
            if(dayList.length != 0) {
                if (dayList.length == 1) {
                    resultList.push(`${dayList[0].substr(0,3)}:${timeValue}`);
                }
                else {
                    resultList.push(`${dayList[0].substr(0,3)}-${dayList[dayList.length - 1].substr(0,3)}:${timeValue}`);
                }
            }
            for(let i = ++index;i<source.order.length - 1;i++){
                if( source.days[source.order[i]] != undefined && source.days[source.order[i]].start){
                    timeValue = `${convertTime(source.days[source.order[i]].start)} - ${convertTime(source.days[source.order[i]].end)}`;
                }
            }
            dayList = [];
        }
    });
    resultList.forEach(element => {
        el = document.createElement('li');
        el.innerText = `${element}`;
        list.appendChild(el);
    });
}
parseObj(source, list);
parseObj(source2,list2); 
parseObj(source3,list3); 
