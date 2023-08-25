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

interface StatsInternObject {
    id_rune: any;
    value: any;
    power: any;
    desc_fr: any;
    level: any;
}

interface RunePriceObject {
    id_rune: any;
    price: any;
}


export default function NewRunesTable({ data, stats, runePrice, setStats, setRunePrice, item }: any) {
    const [totalSansFocus, setTotalSansFocus] = useState(0)
    const [statsIntern, setStatsIntern] = useState<StatsInternObject[]>([]);
    const [RunesPriceIntern, setRunesPriceIntern] = useState<RunePriceObject[]>([]);

    useEffect(() => {
        console.log(data)
        setStatsIntern(data.stats)
        setRunesPriceIntern(data.runesPrice)
    })

    function handleTest() {
        console.log("test")
        setTotalSansFocus(10)
    }

    function handleStat(event: any, id_rune: any, i: any) {
        let temp_state: any;
        // console.log(event.target.value, statsIntern[i])

        // if (event.target.value == data.stats[i].value) {



            temp_state = [...stats];

            data.stats[i].value = event.target.value

            console.log("enter test", id_rune)
            const isIn = temp_state.find(({ id }: any) => Number(id) === Number(id_rune))
            console.log(isIn)
            if (isIn != undefined) {
                console.log("enter not undefined")
                const idToUpdate = temp_state.findIndex(({ id }: any) => Number(id) === Number(id_rune))
                temp_state[idToUpdate].value = event.target.value
                setStats(temp_state)
            }
            else {
                console.log("enter undefined")
                temp_state.push({ "id": Number(id_rune), "value": event.target.value })
                setStats(temp_state)
            }
            console.log(temp_state)
        // }
        // 
    }

    function handleChangeStat(event: any, i: any) {
        console.log(event.target.value, statsIntern[i])
        let temp_state: any;

        temp_state = [...statsIntern];

        temp_state[i].value = event.target.value

        setStatsIntern(temp_state);
    }

    function handleChangeRunePrice(event: any, i: any) {
        console.log(event.target.value, RunesPriceIntern)
        let temp_state: any;

        temp_state = [...RunesPriceIntern];

        temp_state[i].price = event.target.value

        setRunesPriceIntern(temp_state);
    }

    function handleRunes(event: any, id_rune: any, i: any) {
        let temp_state: any;

        temp_state = [...runePrice];

        data.runesPrice[i].value = event.target.value

        console.log("enter test")
        const isIn = temp_state.find(({ id }: any) => Number(id) === Number(id_rune))
        console.log(isIn)
        if (isIn != undefined) {
            console.log("enter not undefined")
            const idToUpdate = temp_state.findIndex(({ id }: any) => Number(id) === Number(id_rune))
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
            {statsIntern[0] && RunesPriceIntern[0] ?
                <table className={styles.table__container}>
                    <thead>
                        <tr>
                            <th>Runes</th>
                            <th>Statistiques de l&apos;item</th>
                            <th>Prix de la rune (/u)</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th>Aucun focus</th>
                        </tr>

                    </thead>
                    <tbody>
                        {data.stats.map((object: any, i: any) => {
                            return (
                                <tr key={object.id_rune}>
                                    <td className={styles.td}>
                                        {/* <i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i>  */}
                                        {object.desc_fr}
                                    </td>
                                    <td>
                                        <div className={styles.input_container}>
                                            <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={6} width='auto' focusBorderColor='#01785E' value={statsIntern[i].value}
                                                onBlur={(event) => handleStat(event, object.id_rune, i)}
                                                onChange={(event) => handleChangeStat(event, i)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.input_container}>
                                            <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={6} width='auto' focusBorderColor='#01785E' value={RunesPriceIntern[i].price}
                                                onBlur={(event) => handleRunes(event, object.id_rune, i)}
                                                onChange={(event) => handleChangeRunePrice(event, i)} />
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
                : null}
        </>
    )
}