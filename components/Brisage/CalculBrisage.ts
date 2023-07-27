import axios from 'axios'

export async function calculBrisage(item: any, setItemEffect: any, taux: any) {

    console.log(item)
    axios({
        method: 'get',
        url: "http://localhost:3001/items/item_effect?id="+item.id,
        headers: {},
    })
        .then((response) => {
            if (response.status == 200) {
                console.log("enter", response)
                let arraywithrunescalc = calculFullWeight(response.data.item_effect, item.level, taux)
                setItemEffect(arraywithrunescalc)
            }
            else {
                console.log("error on signup")
            }

        }, (error) => {
            console.log(error);
        });
}

function calculFullWeight(item: any, level: any, taux: any) {
    const total_weight = calculTotalWeight(item)
    let sansfocus = 0
    let avecfocus = 0
    let toReturnArray = []
    for (let i = 0; i < item.length; i++) {
        // console.log(element)
        sansfocus = calculSansFocus(item[i], level, taux)
        avecfocus = calculFocus(item[i], level, taux, total_weight)
        toReturnArray.push({"runes":item[i].desc_fr, "stat":item[i].max,"avecfocus":avecfocus.toFixed(2), "sansfocus": sansfocus})
    }
    console.log(toReturnArray)
    return toReturnArray
}



function calculSansFocus(item: any, level: any, coefficient: any) {
    
    
    let runeWeight = item.power
    // if (item.desc_fr == "Vitalité" || item.desc_fr == "Initiative" || item.desc_fr == "Pods") {
    //     runeWeight = 1
    // }
    // else {
    //     runeWeight = item.power
    // }
    let lineWeight = (item.max)*(item.power)

    const sansfocus = (lineWeight / runeWeight)*(level*0.025) * (coefficient/100)
    return sansfocus
}

function calculFocus(item: any, level: any, coefficient: any, total_weight: any) {

    let lineWeight = (item.max)*(item.power)
    let runeWeight = 0
    if (item.desc_fr == "Vitalité" || item.desc_fr == "Initiative" || item.desc_fr == "Pods") {
        runeWeight = 1
    }
    else {
        runeWeight = item.power
    }
    // if (item.desc_fr == "Vitalité") {lineWeight=item.max/5}

    // const avecfocus = (((total_weight-lineWeight)/2)+lineWeight)*(level*0.025)*(coefficient/100)*0.55
    const avecfocus = ((lineWeight+(total_weight-lineWeight)/2)/runeWeight)*(level*0.025)*(coefficient/100);
    return avecfocus

}

function calculTotalWeight(item: any) {
    let total_weight = 0
    for (let i = 0; i < item.length; i++) {
        total_weight+=item[i].max*item[i].power
        
    }
    return total_weight
}