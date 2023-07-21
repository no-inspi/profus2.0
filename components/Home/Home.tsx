import { Button, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Text } from '@chakra-ui/react'

import styles from './Home.module.css';
import stylesCard from './Card.module.css'

export default function Home() {
    return (
        <>
            <div className={styles.home__container}>
                <div className={styles.home__title}>
                    <span className={styles.animate__charcter}>Develop. Preview. Ship.</span>
                </div>
                <div className={styles.home__description}>
                    Vercel's frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.
                </div>
                <div className={styles.home__button}>
                    <Button colorScheme='whiteAlpha' size='lg'>Start deploying</Button>
                    <Button colorScheme='whiteAlpha' size='lg'>Get a demo</Button>
                </div>
            </div>
            <div className={styles.card__container}>
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
            </div>
            {/* second card line */}
            <div className={styles.card__container}>
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
            </div>
        </>
    )
}