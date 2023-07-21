import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input
} from '@chakra-ui/react'

import styles from "./RunesTable.module.css"
import global_styles from "../global/global.module.css"

export default function RunesTable() {
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
                    <tr>
                        <td className={styles.td}><i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i> Force </td>
                        <td>
                            <div className={styles.input_container}>
                                <Input placeholder='10' className={styles.nb_input}  size='sm' htmlSize={4} width='auto' focusBorderColor='#17cf97'/>
                            </div>
                        </td>
                        <td>
                            <div className={styles.input_container}>
                                <Input placeholder='10' className={styles.nb_input}  size='sm' htmlSize={4} width='auto' focusBorderColor='#17cf97'/>
                            </div>
                        </td>
                        <td>20</td>
                        <td>1200</td>
                        <td>880</td>
                    </tr>
                    <tr>
                        <td className={styles.td}><i className={`${global_styles.stat} ${global_styles.stat_feu} ${styles.icon_carac}`}></i> Feu </td>
                        <td>
                            <div className={styles.input_container}>
                                <Input placeholder='10' className={styles.nb_input}  size='sm' htmlSize={4} width='auto' focusBorderColor='#17cf97'/>
                            </div>
                        </td>
                        <td>
                            <div className={styles.input_container}>
                                <Input placeholder='10' className={styles.nb_input}  size='sm' htmlSize={4} width='auto' focusBorderColor='#17cf97'/>
                            </div>
                        </td>
                        <td>20</td>
                        <td>1200</td>
                        <td>880</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} className={styles.footer_total}><b>Total sans focus :</b></td>
                        <td className={styles.td}><b>1960</b></td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}