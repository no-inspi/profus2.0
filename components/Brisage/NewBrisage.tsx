import { useState, useEffect } from "react"
import { Input, InputGroup, InputLeftAddon, InputRightAddon, useToast, Tooltip, Select, NumberInput, NumberInputField, Spinner } from "@chakra-ui/react"
import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'
import styles from "./SearchBar.module.css"
import brisage_styles from "./Brisage.module.css"
import global_styles from "../global/global.module.css"
import axios from 'axios';
import Cookies from 'js-cookie';

import RunesTable from "./Runes_table"
import NewRunesTable from "./NewRunesTable"
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

export default function NewBrisage() {
    const [item, setItem] = useState({})
    const [stats, setStats] = useState([{ "id": 18206, "value": 355 }])
    const [runePrice, setRunePrice] = useState([])
    const [objectToDisplay, setItemToDisplay] = useState({})
    const [taux, setTaux] = useState("100")
    const [tauxValue, setTauxValue] = useState("100")
    const [isLoading, setisLoading] = useState(true)
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
        console.log(stats, runePrice)
        if (typeof item.name_fr !== "undefined") {

            console.log(item)
            let dataParams = JSON.stringify({
                "stats": stats,
                "runesPrice": runePrice,
                "taux": taux,
                "item_id": item.id_
            });
            console.log(dataParams)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3001/brisage/get_brisage_data',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTIyMTIxMiwiZXhwIjoxNjkxMzA3NjEyfQ.LlRA3HfazhvQ-Q4g5K3YKHq3M-dOS07OWR2yeBPrX60'
                },
                data: dataParams
            };
            setisLoading(true)
            axios.request(config)
                .then((response) => {
                    console.log(response.data);
                    setItemToDisplay(response.data)
                    setisLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [item, taux, stats, runePrice])

    function onValueChange(event: any) {
        console.log(event)
        if (typeof event !== "undefined" && item != event) {


            setItem(event)
            setStats([])
            setRunePrice([])
        }
    }

    const handleResultSelect = (event: any) => {
        var tauxresp = axios({
            method: 'get',
            url: `http://localhost:3001/items/add_item_taux?id=${item.id}&taux=${taux}&serverid=208`,
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
        console.log("change taux", event.target.value)
        if (event.target.value <= 5000) {
            setTaux(event.target.value)
        }
    }

    const handleChangeTauxValue = (event: any) => {
        if (event <= 5000) {
            setTauxValue(event)
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
                    <div>
                        {!item.name_fr ? null :
                            <>
                                {isLoading ? <Spinner color='red.500' size='xl' speed="0.7s"/> :
                                    <>
                                        <div className={brisage_styles.item__container}>
                                            <div className={brisage_styles.item__display}>
                                                {item.name_fr} lvl. {item.level}
                                            </div>
                                            <div>
                                                <InputGroup size='lg'>
                                                    {/*// eslint-disable-next-line react/no-children-prop*/}
                                                    Taux
                                                    <NumberInput step={1} value={tauxValue} min={1} max={5000} className={brisage_styles.input__percent}
                                                        onBlur={(event) => handleChangeTaux(event)}
                                                        onChange={(event) => handleChangeTauxValue(event)}>
                                                        <NumberInputField />
                                                    </NumberInput>
                                                    <Tooltip label="Sauvegarde ton taux pour aider la communauté" aria-label='save_tooltip'>
                                                        {/*<InputRightAddon children='Save' onClick={handleResultSelect} className={brisage_styles.input__right} />*/}
                                                        Save
                                                    </Tooltip>
                                                </InputGroup>

                                            </div>
                                        </div>
                                        <div className={brisage_styles.container_table}>
                                            <NewRunesTable data={objectToDisplay} stats={stats} runePrice={runePrice} setStats={setStats} setRunePrice={setRunePrice} item={item} />
                                        </div>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
                {item.id ? <GraphicBrisageTaux item={item} data={objectToDisplay} /> : null}



            </div>


        </div>
    )
}