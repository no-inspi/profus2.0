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

export default function NewRunesTable({ data, stats, runePrice, setStats, setRunePrice, item }: any) {
    const [totalSansFocus, setTotalSansFocus] = useState(0)

    function handleTest() {
        console.log("test")
        setTotalSansFocus(10)
    }

    function handleStat(event: any, id_rune: any, i: any) {
        console.log(stats)
        let temp_state: any;

        temp_state = [...stats];

        data.stats[i].value = event.target.value

        console.log("enter test")
        const isIn = temp_state.find(({ id }: any) => id === id_rune)
        console.log(isIn)
        if (isIn != undefined) {
            console.log("enter not undefined")
            const idToUpdate = temp_state.findIndex(({ id }: any) => id === id_rune)
            temp_state[idToUpdate].value = event.target.value
            setStats(temp_state)
        }
        else {
            console.log("enter undefined")
            temp_state.push({ "id": id_rune, "value": event.target.value })
            setStats(temp_state)
        }
        console.log(temp_state)

        // 
    }

    function handleRunes(event: any, id_rune: any, i: any) {
        let temp_state: any;

        temp_state = [...runePrice];
        console.log(data)
        data.runesPrice[i].value = event.target.value

        console.log("enter test")
        const isIn = temp_state.find(({ id }: any) => id === id_rune)
        console.log(isIn)
        if (isIn != undefined) {
            console.log("enter not undefined")
            const idToUpdate = temp_state.findIndex(({ id }: any) => id === id_rune)
            temp_state[idToUpdate].value = event.target.value
            setRunePrice(temp_state)
        }
        else {
            console.log("enter undefined")
            temp_state.push({ "id": id_rune, "value": event.target.value })
            setRunePrice(temp_state)
        }
        console.log(temp_state)
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
                    {data.stats.map((object: any, i: any) => {
                        return (
                            <tr>
                                <td className={styles.td}>
                                    {/* <i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i>  */}
                                    {object.desc_fr}
                                </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={6} width='auto' focusBorderColor='#01785E' value={object.value}
                                            onChange={(event) => handleStat(event, object.id_rune, i)} />
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={6} width='auto' focusBorderColor='#01785E' value={data.runesPrice[i].price}
                                            onChange={(event) => handleRunes(event, object.id_rune, i)} />
                                    </div>
                                </td>
                                <td>{data.quantityWithFocus[i]}</td>
                                <td>{data.priceWithFocus[i]}</td>
                                <td>{data.priceWithoutFocus[i]}</td>
                            </tr>
                        );
                    })}

                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><Button bg='#01785E' color="white" _hover={{ bg: '#1B3A4B', color: "white" }} className={styles.button__save} onClick={handleTest}>Save</Button></td>
                        <td colSpan={2} className={styles.footer_total}><b>Total sans focus :</b></td>
                        <td className={styles.td}>
                            <b>{data.totalWithoutFocus}</b>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}