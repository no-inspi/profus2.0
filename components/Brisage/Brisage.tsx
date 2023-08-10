import { useState, useEffect } from "react"
import { Input, InputGroup, InputLeftAddon, InputRightAddon, useToast, Tooltip, Select, NumberInput, NumberInputField } from "@chakra-ui/react"
import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'
import styles from "./SearchBar.module.css"
import brisage_styles from "./Brisage.module.css"
import global_styles from "../global/global.module.css"
import axios from 'axios';
import Cookies from 'js-cookie';

import RunesTable from "./Runes_table"
import { calculBrisage } from "./CalculBrisage"
import GraphicBrisageTaux from "./GraphicBrisageTaux"

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


interface Item {
    id: any;
    name_fr: any;
    desc_fr: any;
    level: any;
    price: any;
}

export default function Brisage() {
    const [item, setItem] = useState<Item | undefined>(undefined)
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

        // const getTaux = async (id_item: any) => {
        //     var runesPrice = await axios({
        //         method: 'get',
        //         url: "http://localhost:3001/items/item_taux?id=" + id_item,
        //         headers: {},
        //     })
        //         .then((response) => {
        //             if (response.status == 200) {
        //                 console.log("got it", response.data)
        //                 if (response.data.length != 0) {
        //                     console.log("enter in")
        //                     setTaux(response.data[0].taux)
        //                     return response.data[0].taux.toString()
        //                 }
        //                 else {
        //                     setTaux("100")
        //                     return "100"
        //                 }
        //             }
        //             else {
        //             }

        //         }, (error) => {
        //             console.log(error);
        //         });
        // }
        if (item) {
            if (Object.keys(item).length !== 0) {

                calculBrisage(item, setItemEffect, taux, itemStat)

                console.log(taux)

            }
        }


    }, [item, taux, itemStat])

    function onValueChange(event: any) {
        console.log(item, event)
        if (typeof event !== "undefined" && item != event) {
            console.log("enter in value change event")
            Cookies.set("newitem", "true")
            console.log(Cookies.get("newitem"))
            setItem(event)

        }
    }

    const handleResultSelect = (event: any) => {
        var tauxresp = axios({
            method: 'get',
            url: `http://localhost:3001/items/add_item_taux?id=${item?.id}&taux=${taux}&serverid=208`,
            headers: {},
        })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data)
                }
                else {
                }

            }, (error) => {
                console.log(error);
            });

        toast({
            title: 'Mise à jour faite !',
            description: "Le taux a bien été mit à jour ! Merci !",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const handleChangeTaux = (event: any) => {
        if (event <= 5000) {
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
                            {item?.name_fr ? (item.name_fr + " lvl." + item.level) : null}
                        </div>
                        <div>
                            {item?.name_fr &&
                                <InputGroup size='lg'>
                                    Taux
                                    <NumberInput step={1} value={taux} min={1} max={5000} className={brisage_styles.input__percent} onChange={(event) => handleChangeTaux(event)}>
                                        <NumberInputField />
                                    </NumberInput>
                                    {/* <Input type="number" max={4000} placeholder='Entre un pourcentage' value={taux} className={brisage_styles.input__percent} onChange={(event) => handleChangeTaux(event)} /> */}
                                    {/* <InputRightAddon children='%' /> */}
                                    <Tooltip label="Sauvegarde ton taux pour aider la communauté" aria-label='save_tooltip'>
                                        {/*<InputRightAddon children='Save' onClick={handleResultSelect} className={brisage_styles.input__right} />*/}
                                        Save
                                    </Tooltip>
                                </InputGroup>
                            }
                        </div>
                    </div>
                    {(item?.name_fr && itemEffect[0]) &&
                        <div className={brisage_styles.container_table}>
                            {/* <i className={`${global_styles.stat} ${global_styles.stat_vitalite}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_force}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_eau}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_agilite}`}></i>
                        <i className={`${global_styles.stat} ${global_styles.stat_neutre}`}></i> */}
                            <RunesTable itemEffect={itemEffect} setItemStat={setItemStat} itemStat={itemStat} />
                        </div>
                    }
                </div>
                {item?.id ? <GraphicBrisageTaux item={item} /> : null}



            </div>


        </div>
    )
}