import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Tooltip,
  useToast
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form";
import connexion from "../Auth/connect"
import inscription from "../Auth/signup"

import styles from "./Navigation.module.css"
import stylesButton from "./Button.module.css"
import stylesModal from "./Modal.module.css"

import React, { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineUser, AiOutlineHome, AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai'
import { IoExitOutline } from 'react-icons/io5'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { GiSettingsKnobs, GiExitDoor } from 'react-icons/gi'
import { GiHammerBreak, GiScythe, GiRuneStone, GiTrade, GiAbdominalArmor } from 'react-icons/gi'
import {GrContactInfo} from 'react-icons/gr'

import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'

const MENUCONST = [
  {
    "link": "/",
    "name": "Home",
    "icon": <AiOutlineHome />
  },
  {
    "link": "/outils/brisage",
    "name": "Brisage",
    "icon": <GiHammerBreak />
  },
  {
    "link": "/outils/fm",
    "name": "FM",
    "icon": <GiRuneStone />
  },
  {
    "link": "/outils/metiers",
    "name": "Métiers",
    "icon": <GiScythe />
  },
  {
    "link": "/outils/almanax",
    "name": "Almanax",
    "icon": <AiOutlineCalendar />
  },
  {
    "link": "/outils/equip",
    "name": "Equipements",
    "icon": <GiAbdominalArmor />
  },
  {
    "link": "/outils/tradehelper",
    "name": "TradeHelper",
    "icon": <GiTrade />
  },
  {
    "link": "/about",
    "name": "Contact",
    "icon": <AiOutlineMessage />
  },
]

type InputsLogin = {
  pseudo: string,
  password: string,
};

type InputsSignUp = {
  email: string,
  pseudoSignup: string,
  passwordSignup: string,
  verifpasswordsignup: string,
};

export default function Navigation() {
  const [isConnected, setIsConnected] = useState(false)
  const [clickedMenu, setClickedMenu] = useState(false)
  const [activeMenu, setActiveMenu] = useState([false, false, false, false, false])
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure()
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure()
  const initialRef = useRef(null)
  const [sticky, setSticky] = useState("");
  const [show, setShow] = useState(false)

  const toast = useToast()

  const router = useRouter()

  // react hooks form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsLogin>();
  const { register: registerSignup, handleSubmit: handleSubmitSignup, watch: watchSignup } = useForm<InputsSignUp>();


  const onSubmit: SubmitHandler<InputsLogin> = data => connexion(data, window.location.pathname, setIsConnected, onCloseLogin, toast);
  const onSubmitSignup: SubmitHandler<InputsSignUp> = data => inscription(data, window.location.pathname, setIsConnected, onCloseSignup, toast);


  useEffect(() => {
    const localpath = window.location.pathname
    for (let i = 0; i < MENUCONST.length; i++) {
      if (MENUCONST[i].link === localpath) {
        handleNav(i)
      }

    }

    if (Cookies.get('accessToken')) {
      setIsConnected(true)
    }

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [])

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 10 ? styles.is_sticky : "";
    setSticky(stickyClass);

  };

  const handleClick = () => {
    setClickedMenu(!clickedMenu)
    console.log(window.location.pathname)
  }

  const handleNav = (index: number) => {
    let temp_state = [...activeMenu];
    let temp_element = temp_state[index];
    temp_element = true;
    temp_state[index] = temp_element
    setActiveMenu(temp_state)
  }

  const handleShowPwd = () => setShow(!show)

  const deconnexion = () => {

    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setIsConnected(false)
    toast({
      title: 'Déconnexion Réussie !',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <nav className={`${styles.nav} ${sticky}`}>
      <svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" className="ccustom" fill="#17CF97"></path> <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" className="ccustom" fill="#17CF97"></path> <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" className="ccustom" fill="#17CF97"></path> <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" className="ccustom" fill="#17CF97"></path> </svg>        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0 }}>
          <ul className={clickedMenu ? `${styles.navbar} ${styles.active}` : styles.navbar}>
            {MENUCONST.map((menu, index) => ( 
              <li key={menu.name} ><a className={activeMenu[index] ? styles.active : ""} href={menu.link}>
                <div className={styles.link__flex}>
                  <div>
                    {menu.icon}
                  </div>
                  <div>
                    {menu.name}
                  </div>
                </div>
              </a>
              </li>
            ))}
            <li>
              <div className={stylesButton.loginContainer}>
                {!isConnected ? (
                  <>
                    <button className={`${stylesButton.button} ${stylesButton.dark}`} onClick={onOpenLogin}> Log in </button>
                    <button className={`${stylesButton.button} ${stylesButton.white}`} onClick={onOpenSignup}> Sign Up </button>
                  </>
                ) : (
                  <div className={styles.connected__container}>
                    <Tooltip label="Paramètres du comptes" aria-label='save_tooltip'>
                      <div className={`${styles.connected__settings} ${stylesButton.white}`}><GiSettingsKnobs /></div>
                    </Tooltip>
                    <button className={`${stylesButton.button} ${stylesButton.dark} ${styles.connected__deconnexion}`} onClick={deconnexion}> Deconnexion <GiExitDoor /> </button>
                  </div>
                )
                }
              </div>
            </li>
            {/* <li>
              <Menu>
                <MenuButton className={styles.avatar}>
                  <Avatar size='sm' bg='white.500' icon={<AiOutlineUser fontSize='1.5rem' />} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem icon={<MdOutlineAccountCircle style={{ fontSize: "1.4em" }} />}>My Account </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <div onClick={onOpen}>
                    <MenuItem icon={<IoExitOutline style={{ fontSize: "1.4em" }} />}> Connexion </MenuItem>
                  </div>
                  <MenuItem icon={<IoExitOutline style={{ fontSize: "1.4em" }} />}> Deconnexion </MenuItem>
                </MenuList>
              </Menu>
            </li> */}

            {/* <li><a>Shop</a></li>
            <li><a>Blog</a></li>
            <li><a>About</a></li>
            <li><a>Contact </a></li> */}
          </ul>

        </motion.div>
        <div className={styles.mobile} onClick={handleClick}>
          <FontAwesomeIcon icon={clickedMenu ? faXmark : faBars} className={styles.mobile_el} />
          {/* <FontAwesomeIcon icon={faXmark} /> */}
        </div>
      </nav>

      {/* Sign up Modal */}
      <Modal isOpen={isOpenSignup} onClose={onCloseSignup} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
            <ModalHeader className={stylesModal.header}>Créer un compte</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' {...registerSignup("email", { required: true })} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Pseudo</FormLabel>
                <Input type='text' {...registerSignup("pseudoSignup", { required: true })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...registerSignup("passwordSignup", { required: true })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPwd}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm your password</FormLabel>
                <Input type='password' {...registerSignup("verifpasswordsignup", { required: true })} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} type='submit'>
                Créer mon compte
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onCloseSignup}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Log in Modal */}
      <Modal isOpen={isOpenLogin} onClose={onCloseLogin} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className={stylesModal.header}>Connexion</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>

              <FormControl isRequired>
                <FormLabel>Pseudo</FormLabel>
                <Input type='text' placeholder='Enter pseudo' {...register("pseudo", { required: true })} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...register("password", { required: true })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPwd}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>

              {/*<button className={`${stylesButton.button} ${stylesButton.white}`} style={{marginRight: 3}} onClick={onCloseLogin}> Quitter </button>*/}
              <Button className={`${stylesButton.button}`} colorScheme='darkButton' mr={3} type="submit"> Connexion </Button>
              <Button className={`${stylesButton.button} ${stylesButton.white}`} mr={3} onClick={onCloseLogin}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

    </>
  )
}