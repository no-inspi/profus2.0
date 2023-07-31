import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    Button
} from '@chakra-ui/react'

import Cookies from 'js-cookie';
import axios from 'axios';

import { useState, useEffect } from 'react'

import styles from "./RunesTable.module.css"
import global_styles from "../global/global.module.css"

export default function RunesTable({ itemEffect, setItemStat, itemStat }: any) {
    const [stats, setStats] = useState([])
    const [runesPrice, setRunesPrice] = useState([])
    const [totalSansFocus, setTotalSansFocus] = useState(0)

    useEffect(() => {
        console.log(itemEffect, itemStat)

        const fetchData = async (itemEffectTmp: any) => {
            let price_array = []
            let totalSansFocusTmp = 0
            // get the data from the api
            for (let j = 0; j < itemEffectTmp[0].length; j++) {


                var runesPrice = await axios({
                    method: 'get',
                    url: "http://localhost:3001/items/rune_price?id=" + itemEffectTmp[0][j].rune_item_id,
                    headers: {},
                })
                    .then((response) => {
                        if (response.status == 200) {
                            // console.log(response.data.price)
                            price_array.push(response.data.price)
                            totalSansFocusTmp+= response.data.price*itemEffectTmp[1][j]
                        }
                        else {
                        }

                    }, (error) => {
                        console.log(error);
                    });
            }
            // set state with the result
            if (totalSansFocus == 0 || Cookies.get("newitem") == "true") {
                setTotalSansFocus(totalSansFocusTmp)
            }
            
            setRunesPrice(price_array)
        }

        if ((itemEffect.length != 0 && itemStat.length == 0) || Cookies.get("newitem") == "true") {
            let min_array = []


            for (let j = 0; j < itemEffect[0].length; j++) {
                min_array.push(itemEffect[0][j].min)

            }
            
            setStats(min_array)
        }
        if (itemEffect.length != 0) {
            let total = 0
            for (let i = 0; i < itemEffect[1].length; i++) {
                total+=itemEffect[1][i]*runesPrice[i]
                
            }
            setTotalSansFocus(total)
            fetchData(itemEffect).catch(console.error);
        }
        


    }, [itemEffect])

    function handleStat(event: any, i: any) {
        
        let temp_state: any;
       
        temp_state = [...stats];
    
        let temp_element: any;

        temp_element = temp_state[i];
        temp_element = Number(event.target.value);


        temp_state[i] = temp_element;
        Cookies.set("newitem", "false")
        setStats(temp_state)
        setItemStat(temp_state)
    }

    function handleRunes (event: any, i: any) {
        let temp_state: any;
       
        temp_state = [...runesPrice];
    
        let temp_element: any;

        temp_element = temp_state[i];
        temp_element = Number(event.target.value);


        temp_state[i] = temp_element;
        if (itemEffect.length !=0) {
            let total = 0
            for (let i = 0; i < itemEffect[1].length; i++) {
                total+=itemEffect[1][i]*temp_state[i]
                
            }
            setTotalSansFocus(total)
        }
        setRunesPrice(temp_state)
    }

    return (
        <>
            <table className={styles.table__container}>
                <thead>
                    <tr>
                        <th>Runes</th>
                        <th>Statistiques de l'item</th>
                        <th>Prix de la rune (/u)</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Aucun focus</th>
                    </tr>

                </thead>
                <tbody>
                    {itemEffect[0]?.map((object: any, i: any) => {
                        return (
                            <tr>
                                <td className={styles.td}>
                                    {/* <i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i>  */}
                                    {object.desc_fr}
                                </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={4} width='auto' focusBorderColor='#01785E' value={stats[i]}
                                            onChange={(event) => handleStat(event, i)} />
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={4} width='auto' focusBorderColor='#01785E' value={runesPrice[i]}
                                        onChange={(event) => handleRunes(event, i)} />
                                    </div>
                                </td>
                                <td>{itemEffect[2][i] < 0 ? 0 : itemEffect[2][i]}</td>
                                <td>{itemEffect[2][i] < 0 ? 0 : itemEffect[2][i] * runesPrice[i]}</td>
                                <td>{itemEffect[1][i] < 0 ? 0 : itemEffect[1][i] * runesPrice[i]}</td>
                            </tr>
                        );
                    })}

                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><Button bg='#01785E' color="white" _hover={{ bg: '#1B3A4B', color: "white" }} className={styles.button__save}>Save</Button></td>
                        <td colSpan={2} className={styles.footer_total}><b>Total sans focus :</b></td>
                        <td className={styles.td}>
                            <b>{totalSansFocus}</b>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}