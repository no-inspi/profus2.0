import { Button, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Text } from '@chakra-ui/react'

import styles from './Home.module.css';
import stylesCard from './Card.module.css'
import stylesButton from './Button.module.css'

export default function Home() {
    return (
        <>
            <div className={styles.home__container}>
                <div className={styles.home__title}>
                    {/* <span className={styles.animate__charcter}>
                        Develop. Preview. Ship.
                    </span> */}
                    <h1 className={styles.home__title__container}>
                        <span className={styles.first_main_gradient_text}>
                            <span className={styles.first_gradient_text}>
                                Créer.
                            </span>
                        </span>
                        <span className={styles.second_main_gradient_text}>
                            <span className={styles.second_gradient_text}>
                                Craft.
                            </span>
                        </span>
                        <span className={styles.third_main_gradient_text}>
                            <span className={styles.third_gradient_text}>
                                Optimise.
                            </span>
                        </span>
                    </h1>
                </div>
                <h2 className={styles.home__description}>
                    Vercel's frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.
                </h2>
                <div className={styles.home__button}>
                    <a className={`${stylesButton.basic_button}`}>Briser un item</a>
                    <a className={`${stylesButton.gradient_border}`}>Les métiers</a>
                </div>
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
            <div className={styles.title__before}>
                <span className={styles.title__before__text}>Explore Profus</span>
            </div>
            <div className={styles.step__container}>
                <span className={styles.step__lines}></span>
                <div className={styles.step__number__container}>
                    <span className={styles.step__number}>1</span>
                </div>
                <h3 className={styles.step__title}>
                    <span className={styles.step__title__text}>Créer</span>
                </h3>
            </div>
            <div className={styles.step__h4class__container}>
                <h4 className={styles.step__h4class}>
                    <span className={styles.step__h4class__text}>Build when inspiration strikes</span>
                </h4>
                <p className={styles.step__p}>
                    <span className={styles.step__p__text}>lorem lipsum some test lorem lipsum some test lorem lipsum some test lorem lipsum some test lorem lipsum some test</span>
                </p>
            </div>
            <div className={styles.step__container}>
                <span className={styles.step__lines}></span>
                <div className={styles.step__number__container}>
                    <span className={styles.step__number}>2</span>
                </div>
                <h3 className={styles.step__title}>
                    <span className={styles.step__title__text}>Craft</span>
                </h3>
            </div>
        </>
    )
}