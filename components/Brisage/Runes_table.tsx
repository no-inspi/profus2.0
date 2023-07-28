import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    Button
} from '@chakra-ui/react'

import {useState, useEffect} from 'react'

import styles from "./RunesTable.module.css"
import global_styles from "../global/global.module.css"

export default function RunesTable({itemEffect, setItemStat, itemStat}:any) {
    const [stats, setStats] = useState([])
    
    useEffect(() => {

        if (itemEffect.length != 0 && itemStat.length==0) {
            let min_array = []
            for (let j = 0; j < itemEffect[0].length; j++) {
                min_array.push(itemEffect[0][j].min)
                
            }
            setStats(min_array)
        }
        

    }, [itemEffect])

    function handleStat(event: any, i:any) {
        console.log(stats)
        let temp_state:any;
        temp_state = [...stats];
        let temp_element:any;

        temp_element = temp_state[i];
        temp_element = Number(event.target.value);

        console.log(temp_element)
        temp_state[i] = temp_element;
        console.log(temp_state)
        setStats(temp_state)
        setItemStat(temp_state)
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
                    {itemEffect[0]?.map((object:any, i:any) => {
                        return (
                            <tr>
                                <td className={styles.td}>
                                    {/* <i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i>  */}
                                    {object.desc_fr} 
                                    </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={4} width='auto' focusBorderColor='#01785E' value={stats[i]} 
                                        onChange={(event) => handleStat(event, i)}/>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.input_container}>
                                        <Input placeholder='10' className={styles.nb_input} size='sm' htmlSize={4} width='auto' focusBorderColor='#01785E' />
                                    </div>
                                </td>
                                <td>{itemEffect[2][i] < 0 ? 0 : itemEffect[2][i] }</td>
                                <td>{itemEffect[2][i] < 0 ? 0 : itemEffect[2][i]*50 }</td>
                                <td>{itemEffect[1][i] < 0 ? 0 : itemEffect[1][i]*50}</td>
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
                        <td className={styles.td}><b>{itemEffect[3]*50}</b></td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}