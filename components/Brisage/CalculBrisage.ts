import axios from 'axios'

export async function calculBrisage(item: any, setItemEffect: any, taux: any, itemStat: any) {

    console.log(itemStat)
    axios({
        method: 'get',
        url: "http://localhost:3001/items/item_effect?id="+item.id,
        headers: {},
    })
        .then((response) => {
            if (response.status == 200) {
                let sansfocus = calculSansFocus(response.data.item_effect, item.level, taux, itemStat)
                let avecfocus = calculFocus(response.data.item_effect, item.level, taux, itemStat)
                const sum = sumRunesSansFocus(sansfocus)
                setItemEffect([response.data.item_effect, sansfocus, avecfocus, sum])
            }
            else {
                console.log("error on signup")
            }

        }, (error) => {
            console.log(error);
        });
}


function sumRunesSansFocus(items: any) {
    console.log(items)
    var total = 0
    for (let i = 0; i < items.length; i++) {
        total += items[i]
    }
    return total
}


function calculFocus(item: any, level: any, coefficient: any, itemStat: any) {
    let WeightArray = []
    let AvecFocus = []
    let totalWeight = 0
    
    for (let i = 0; i < item.length; i++) {
        if (itemStat.length == 0) {
            var calculPoidsLigne = ((3*item[i].min*item[i].power*level)/200)+1
        }
        else {
            var calculPoidsLigne = ((3*itemStat[i]*item[i].power*level)/200)+1
        }
        totalWeight+=calculPoidsLigne
        if (item[i].desc_fr == "Vitalité" || item[i].desc_fr == "Initiative" || item[i].desc_fr == "Pods") {
            WeightArray.push({"poids": 1,"poidsLigne": calculPoidsLigne})
        }
        else {
            WeightArray.push({"poids": item[i].power,"poidsLigne": calculPoidsLigne})
        }
        
    }
   
    for (let j = 0; j < WeightArray.length; j++) {
        var value = (WeightArray[j].poidsLigne+((totalWeight-WeightArray[j].poidsLigne)/2))*coefficient/100/WeightArray[j].poids
        AvecFocus.push(Math.floor(value))
        
    }
    console.log(AvecFocus)
    return AvecFocus
}

function calculSansFocus(item: any, level: any, coefficient: any, itemStat: any) {
    let WeightArray = []
    let sansFocus = []
    let totalWeight = 0

    for (let i = 0; i < item.length; i++) {
        if (itemStat.length == 0) {
            var calculPoidsLigne = ((3*item[i].min*item[i].power*level)/200)+1
        }
        else {
            var calculPoidsLigne = ((3*itemStat[i]*item[i].power*level)/200)+1
        }
        totalWeight+=calculPoidsLigne
        if (item[i].desc_fr == "Vitalité" || item[i].desc_fr == "Initiative" || item[i].desc_fr == "Pods") {
            WeightArray.push({"poids": 1,"poidsLigne": calculPoidsLigne})
        }
        else {
            WeightArray.push({"poids": item[i].power,"poidsLigne": calculPoidsLigne})
        }
        
    }

    for (let j = 0; j < WeightArray.length; j++) {
        var value =(WeightArray[j].poidsLigne)*coefficient/100/WeightArray[j].poids
        sansFocus.push(Math.floor(value))
        
    }
    console.log(sansFocus)
    return sansFocus

}