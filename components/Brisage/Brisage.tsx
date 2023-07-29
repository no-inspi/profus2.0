import { useState, useEffect } from "react"
import { Input, InputGroup, InputLeftAddon, InputRightAddon, useToast, Tooltip, Select, NumberInput, NumberInputField  } from "@chakra-ui/react"
import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'
import styles from "./SearchBar.module.css"
import brisage_styles from "./Brisage.module.css"
import global_styles from "../global/global.module.css"

import Cookies from 'js-cookie';

import RunesTable from "./Runes_table"
import { calculBrisage } from "./CalculBrisage"

const style = {
    input: styles.searchbox,
    listbox: styles.listbox,
    highlightedItem: styles.highlightedItem,
    query: styles.query,
    typeahead: 'text-slate-500',
    clearButton: styles.clearButton,
    noItems: 'cursor-default text-center my-20',
    match: 'font-semibold',
    groupHeading: styles.groupHeading,
}





const Item = (item: any) => {
    // const avatar = `${item.thumbnail.path}.${item.thumbnail.extension}`
    return (
        <div className={styles.listbox_custom}>
            {/* <img
          width={35}
          height={35}
          src={avatar}
          alt={item.name}
          className='rounded-full object-cover mr-3'
        /> */}
            <p>{item.item.name_fr} lvl.{item.item.level}</p>
        </div>
    )
}

export default function Brisage() {
    const [item, setItem] = useState({})
    const [itemStat, setItemStat] = useState([])
    const [itemEffect, setItemEffect] = useState([])
    const [taux, setTaux] = useState("100")
    const [isLoading, setisLoading] = useState(false)
    const toast = useToast()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get('accessToken'));
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    const listbox = {
        displayField: 'name',
        data: async (query: any) => {
            const res = await fetch(
                `http://localhost:3001/items/get_item_filter?contains=${query}`, requestOptions
            )
            const data = await res.json()
            return data;
        },
        searchType: 'contains',
    }

    useEffect(() => {
        
        if (item !== "undefined") {
            console.log("enter in brisage")
            calculBrisage(item, setItemEffect, taux, itemStat)
        }
        
    }, [item, taux, itemStat])

    function onValueChange(event: any) {
        console.log(item, event)
        if (typeof event !== "undefined" && item!=event) {
            console.log("enter in value change event")
            Cookies.set("newitem", "true")
            console.log(Cookies.get("newitem"))
            setItem(event)
            
        }
    }

    const handleResultSelect = () => {
        console.log("in select")
        toast({
            title: 'Mise à jour faite !',
            description: "Le taux a bien été mit à jour ! Merci !",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const handleChangeTaux = (event: any) => {
        console.log(event)
        // let final_value = event.target.value.split("%")[0]
        if (event<=5000) {
            setTaux(event)
        }
        
    }

    return (
        <div className="background__color">
            <div className={brisage_styles.brisage__container}>
                <div className={brisage_styles.brisage__title}></div>
                <div className={brisage_styles.brisage__card}>
                    <div className={brisage_styles.brisage__server__container}>
                        <div className={brisage_styles.brisage__server}>
                            <Select >
                                <option value='Imagiro' className={brisage_styles.option__select}>Imagiro</option>
                                <option value='Draconiros' className={brisage_styles.option__select}>Draconiros</option>
                                <option value='Tylezia' className={brisage_styles.option__select}>Tylezia</option>
                            </Select>
                        </div>
                        <Turnstone
                            id='search'
                            name='search'
                            minQueryLength={3}
                            autoFocus={true}
                            typeahead={true}
                            clearButton={true}
                            debounceWait={150}
                            listboxIsImmutable={false}
                            maxItems={15}
                            matchText={true}
                            noItemsMessage="Aucun objet ne correspond. Si vous pensez que c'est une erreur, veuillez nous contacter"
                            placeholder='Recherche un item ...'
                            listbox={listbox}
                            styles={style}
                            Item={Item}
                            plugins={[recentSearchesPlugin]}
                            onSelect={(event: any) => onValueChange(event)}
                        />
                    </div>
                    <div className={brisage_styles.item__container}>
                        <div className={brisage_styles.item__display}>
                            {item.name_fr ? (item.name_fr + " lvl." + item.level) : null}
                        </div>
                        <div>
                            {item.name_fr &&
                                <InputGroup size='lg'>
                                    <InputLeftAddon children='Taux' />
                                    <NumberInput step={1} defaultValue={100} min={1} max={5000} className={brisage_styles.input__percent} onChange={(event) => handleChangeTaux(event)}>
                                        <NumberInputField />
                                    </NumberInput>
                                    {/* <Input type="number" max={4000} placeholder='Entre un pourcentage' value={taux} className={brisage_styles.input__percent} onChange={(event) => handleChangeTaux(event)} /> */}
                                    {/* <InputRightAddon children='%' /> */}
                                    <Tooltip label="Sauvegarde ton taux pour aider la communauté" aria-label='save_tooltip'>
                                        <InputRightAddon children='Save' onClick={handleResultSelect} className={brisage_styles.input__right} />
                                    </Tooltip>
                                </InputGroup>
                            }
                        </div>
                    </div>
                    {(item.name_fr && itemEffect[0]) &&
                        <div className={brisage_styles.container_table}>
                            {/* <i className={`${global_styles.stat} ${global_styles.stat_vitalite}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_force}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_eau}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_agilite}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_neutre}`}></i> */}
                            <RunesTable itemEffect={itemEffect}  setItemStat={setItemStat} itemStat={itemStat}/>
                        </div>
                    }
                </div>

            </div>


        </div>
    )
}