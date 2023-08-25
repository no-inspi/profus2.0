import { Button, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { motion } from "framer-motion"

import styles from './Home.module.css';
import stylesCard from './Card.module.css'
import stylesButton from './Button.module.css'

import Image from 'next/image'
import home_full from '../img/home_full.png'
import home_metier from '../img/metiers.png'
import home_rune from '../img/page_rune.png'

import { GiHammerBreak, GiScythe, GiRuneStone, GiTrade } from 'react-icons/gi'
import { MdInventory } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { CalendarIcon } from '@chakra-ui/icons';

import { AiOutlineCalendar } from 'react-icons/ai'

export default function Home() {
    return (
        <>
            <div className={styles.home__container}>
                <motion.div
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className={styles.home__title}>
                    {/* <span className={styles.animate__charcter}>
                        Develop. Preview. Ship.
                    </span> */}
                    <h1 className={styles.home__title__container}>
                        <span className={styles.first_main_gradient_text}>
                            <span className={styles.first_gradient_text}>
                                Optimise.
                            </span>
                        </span>
                        <span className={styles.second_main_gradient_text}>
                            <span className={styles.second_gradient_text}>
                                Avec.
                            </span>
                        </span>
                        <span className={styles.third_main_gradient_text}>
                            <span className={styles.third_gradient_text}>
                                Profus.
                            </span>
                        </span>
                    </h1>
                </motion.div>
                <motion.h2
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.home__description}>
                    Profus met gratuitement à disposition des outils vous permettant d&apos;optimiser votre expérience ingame
                </motion.h2>
                <motion.div
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className={styles.home__button}>
                    <a className={`${stylesButton.basic_button}`}>Briser un item</a>
                    <a className={`${stylesButton.gradient_border}`}>Les métiers</a>
                </motion.div>
            </div>
            {/* <div className={styles.card__container}>
                <div className={stylesCard.ag_courses_item}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            Brisage
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            Trouve le meilleur item à briser
                        </div>
                    </a>
                </div>
                <div className={stylesCard.ag_courses_item}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            FM
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            Gère ton fm comme jaja
                        </div>
                    </a>
                </div>
                <div className={stylesCard.ag_courses_item}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            Optimisation des métiers
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            Optimise ta monter de métier
                        </div>
                    </a>
                </div>
            </div> */}
            {/* second card line */}
            {/* <div className={styles.card__container}>
                <div className={`${stylesCard.ag_courses_item} ${stylesCard.fourth_card_container}`}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            Almanax
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            La liste de tous les almanax, avec les plus rentables
                        </div>
                    </a>
                </div>
                <div className={`${stylesCard.ag_courses_item} ${stylesCard.fifth_card_container}`}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            Equipements & Ressources
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            Une liste exhaustive des items/ressources disponibles
                        </div>
                    </a>
                </div>
                <div className={`${stylesCard.ag_courses_item} ${stylesCard.sixth_card_container}`}>
                    <a href="#" className={stylesCard.ag_courses_item_link}>
                        <div className={stylesCard.ag_courses_item_bg}></div>

                        <div className={stylesCard.ag_courses_item_title}>
                            Un trade helper
                        </div>

                        <div className={stylesCard.ag_courses_item_date_box}>
                            Parfait pour optimiser l'achat/revente
                        </div>
                    </a>
                </div>
            </div> */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <div className={styles.title__before}>
                    <span className={styles.title__before__text}>Explore Profus</span>
                </div>
                <div className={styles.step__container}>
                    <span className={styles.step__lines}></span>
                    <div className={styles.step__number__container}>
                        <span className={styles.step__number}>1</span>
                    </div>
                    <h3 className={styles.step__title}>
                        <span className={styles.step__title__text}>Optimisation</span>
                    </h3>
                </div>
                <div className={styles.step__h4class__container}>
                    <h4 className={styles.step__h4class}>
                        <span className={styles.step__h4class__text}>Pour encore plus de kamas</span>
                    </h4>
                    <p className={styles.step__p}>
                        <span className={styles.step__p__text}>Gagne du temps et optimise tes actions en jeu </span>
                    </p>
                </div>
            </motion.div>
            <motion.div className={styles.showroom__container} initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                <div className={styles.showroom__image}>
                    <Image
                        src={home_full}
                        // width={800}
                        // height={500}
                        alt="Picture of the author"
                        className={styles.showroom__image__top}
                    />
                    <Image
                        src={home_metier}
                        // width={500}
                        // height={500}
                        alt="Picture of the author"
                        className={styles.showroom__image__middle}
                    />
                    <Image
                        src={home_rune}
                        // width={500}
                        // height={500}
                        alt="Picture of the author"
                        className={styles.showroom__image__bottom}
                    />
                </div>
                <div className={styles.showroom__global__container}>
                    <div className={styles.showroom__text}>
                        <div className={styles.showroom__icon}>
                            <GiHammerBreak style={{ fontSize: "3rem", color: "white" }} />
                        </div>
                        <h5 className={styles.h5class}>
                            Optimise le brisage de ton item
                        </h5>
                        <div className={styles.showroom__description}>
                            Simplement en rentrant le nom de l&apos;item, tu obtiendras le nombre de kamas précis que tu peux générer en brisant avec ou sans focus.
                        </div>
                    </div>
                    <div className={styles.showroom__text}>
                        <div className={styles.showroom__icon}>
                            <GiScythe style={{ fontSize: "3rem", color: "white" }} />
                        </div>
                        <h5 className={styles.h5class}>
                            Economise des kamas en montant tes métiers
                        </h5>
                        <div className={styles.showroom__description}>
                            Etre rentable en montant son métier de craft ou de récolte ? C&apos;est possible avec cet outil qui te permettra d&apos;obtenir la meilleure combinaison de recette et de ressource
                        </div>
                    </div>
                    <div className={styles.showroom__text}>
                        <div className={styles.showroom__icon}>
                            <GiRuneStone style={{ fontSize: "3rem", color: "white" }} />
                        </div>
                        <h5 className={styles.h5class}>
                            Trouve des astuces fm pour progresser facilement
                        </h5>
                        <div className={styles.showroom__description}>
                            Un tableau te permettant d&apos;avoir rapidement le poids d&apos;une rune et son palier
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
                className={styles.step__container}>
                <span className={styles.step__lines}></span>
                <div className={styles.step__number__container}>
                    <span className={styles.step__number}>2</span>
                </div>
                <h3 className={styles.step__title}>
                    <span className={styles.step__title__text}>Gestion</span>
                </h3>
                <div className={styles.step__h4class__container}>
                    <h4 className={styles.step__h4class}>
                        <span className={styles.step__h4class__text}>Gère tes ressources/craft/ventes </span>
                    </h4>
                    <p className={styles.step__p}>
                        <span className={styles.step__p__text}>Centralise tout au même endroit</span>
                    </p>
                </div>
            </motion.div>
            <motion.div
                // initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
                className={styles.secondpart__card__container}>
                <div className={styles.secondpart__card__flex}>
                    <motion.div
                        initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} 
                        transition={{opacity: { duration: 0.5, delay: 0.8 }, x: { duration: 0.5, delay: 0.8 }, scale: { duration: 0.1, delay: 0 }}}
                        whileHover={{ scale: 1.1 }}
                        className={styles.secondpart__card}>
                        <div className={styles.secondpart__card__titleicon}>
                            <span className={styles.secondpart__card__icon}><GiTrade size='1.5em' /></span>
                            <span className={styles.secondpart__card__title}>Trade Helper</span>
                        </div>
                        <div className={styles.secondpart__card__text}>
                            Cet outil permet de suivre vos ventes et vos bénéfices net en rentrant les ressources/objets que vous avez vendu
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} 
                        transition={{opacity: { duration: 0.5, delay: 0.8 }, x: { duration: 0.5, delay: 0.8 }, scale: { duration: 0.1, delay: 0 }}}
                        whileHover={{ scale: 1.1 }}
                        className={styles.secondpart__card}>
                        <div className={styles.secondpart__card__titleicon}>
                            <span className={styles.secondpart__card__icon}><MdInventory size='1.5em' /></span>
                            <span className={styles.secondpart__card__title}>Inventaire</span>
                        </div>
                        <div className={styles.secondpart__card__text}>
                            Cet outil permet de suivre vos ventes et vos bénéfices net en rentrant les ressources/objets que vous avez vendu
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} 
                        transition={{opacity: { duration: 0.5, delay: 0.8 }, x: { duration: 0.5, delay: 0.8 }, scale: { duration: 0.1, delay: 0 }}}
                        whileHover={{ scale: 1.1 }}
                        className={styles.secondpart__card}>
                        <div className={styles.secondpart__card__titleicon}>
                            <span className={styles.secondpart__card__icon}><FaShoppingCart size='1.5em' /></span>
                            <span className={styles.secondpart__card__title}>Shopping List</span>
                        </div>
                        <div className={styles.secondpart__card__text}>
                            Cet outil permet de suivre vos ventes et vos bénéfices net en rentrant les ressources/objets que vous avez vendu
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} 
                        transition={{opacity: { duration: 0.5, delay: 0.8 }, x: { duration: 0.5, delay: 0.8 }, scale: { duration: 0.1, delay: 0 }}}
                        whileHover={{ scale: 1.1 }}
                        className={styles.secondpart__card}>
                        <div className={styles.secondpart__card__titleicon}>
                            <span className={styles.secondpart__card__icon}><AiOutlineCalendar size='1.5em' /></span>
                            <span className={styles.secondpart__card__title}>Almanax</span>
                        </div>
                        <div className={styles.secondpart__card__text}>
                            Cet outil permet de suivre vos ventes et vos bénéfices net en rentrant les ressources/objets que vous avez vendu
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} 
                        transition={{opacity: { duration: 0.5, delay: 0.8 }, x: { duration: 0.5, delay: 0.8 }, scale: { duration: 0.1, delay: 0 }}}
                        whileHover={{ scale: 1.1 }}
                        className={styles.secondpart__card}>
                        <div className={styles.secondpart__card__titleicon}>
                            <span className={styles.secondpart__card__icon}><FaShoppingCart size='1.5em' /></span>
                            <span className={styles.secondpart__card__title}>Shopping List</span>
                        </div>
                        <div className={styles.secondpart__card__text}>
                            Cet outil permet de suivre vos ventes et vos bénéfices net en rentrant les ressources/objets que vous avez vendu
                        </div>
                    </motion.div>
                </div>
            </motion.div>

        </>
    )
}