import React, { useState } from 'react'
import imageMap from '../../utils/helpers'
import Modal from 'react-bootstrap/Modal';
import { errorMsg, successMsg } from '../../utils/customFn';
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
const baseUrl = import.meta.env.VITE_BASE_URL;
const WalletCards = ({ data }) => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [amount, setAmount] = useState();


    const [cashModal, setCashModal] = useState(false);
    const [cashTransferWallet, setCashTransferWallet] = useState('')
    const [cashError, setCashError] = useState();

    const [AZModal, setAZModal] = useState(false);
    const [recieversEmail, setRecieversEmail] = useState('')
    const [AZError, setAZError] = useState();



    const handleShowCash = (e) => {
        e.preventDefault()
        setCashModal(true)
    }

    const handleShowAZ = (e) => {
        e.preventDefault()
        setAZModal(true)
    }

    const handleShowGame = (e) => {
        e.preventDefault()
        setCashModal(true)
    }

    const handleShowWithdraw = (e) => {
        e.preventDefault()
        setCashModal(true)
    }


    const handleClose = () => {
        setCashModal(false);
        setCashTransferWallet('');
        setRecieversEmail('');
        setCashError('');
        setAZModal('');
        setRecieversEmail('');
        setAZError('')
        setAmount('')
    }

    const handleWalletSelect = (value) => {
        setCashTransferWallet(value)
    }

    const handleNext = (e) => {
        e.preventDefault();

    }

    const handleChangeAmount = (value) => {
        setAmount(value)
    }

    const handleSubmitCash = async (e) => {
        e.preventDefault();
        try {

            const valid = validationCash();
            if (valid) {
                let payload = {
                    amount, type: cashTransferWallet == 'az' ? 8 : 12
                }
                let res = await fetchData(API_ENDPOINTS.cashWalletTransactions, navigate, 'POST', payload);
                if (res.success) {
                    successMsg(res.message)
                } else {
                    errorMsg(res.message)
                }
            } else {
                errorMsg(cashError)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const validationCash = () => {
        return true
    }

    const handleSubmitAZ = async (e) => {
        e.preventDefault();
        try {

            const valid = validationAZ();
            if (valid) {
                let payload = {
                    amount, recievers_email: recieversEmail
                }
                let res = await fetchData(API_ENDPOINTS.azWalletTransactions, navigate, 'POST', payload);
                if (res.success) {
                    successMsg(res.message)
                } else {
                    errorMsg(res.message)
                }
            } else {
                errorMsg(AZError)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const validationAZ = () => {
        return true
    }

    const handleChangeReciever = (value) => {
        setRecieversEmail(value)
    }
    return (

        <>
            <div className='wallet-cards'>
                <div className='card-wrapped theme-card'>
                    <div className='card-content'>
                        <div className='icon'>
                            <img src={`${baseUrl}images/logo-1.png`} alt='icon' />
                        </div>
                        <div className='content'>
                            <h3>AZ Wallet</h3>
                            <p>${parseFloat(data?.azWallet).toFixed(2)}</p>
                        </div>
                    </div>
                    <p className='des'>Use this wallet to purchase premium mall products. Funds come from the Cash Wallet. You can also send money to others with a 1% fee.</p>
                    <button type='button' onClick={e => { handleShowAZ(e, 'az') }} className='withdra-btn'>Purchase</button>
                </div>
                <div className='card-wrapped theme-card'>
                    <div className='card-content'>
                        <div className='icon'>
                            <img src={imageMap['gameicon.png']} alt='icon' />
                        </div>
                        <div className='content'>
                            <h3>Game Wallet</h3>
                            <p>${parseFloat(data?.gameWallet).toFixed(2)}</p>
                        </div>
                    </div>
                    <p className='des'>Collect your game earnings here. You can freely transfer the amount to your Cash Wallet to either use in the mall or request a withdrawal.</p>
                    <button type='button' className='withdra-btn' onClick={e => { handleShowGame(e, 'game') }}>Withdraw to cash wallet</button>
                </div>
                <div className='card-wrapped theme-card'>
                    <div className='card-content'>
                        <div className='icon'>
                            <img src={imageMap['cashicon.png']} alt='icon' />
                        </div>
                        <div className='content'>
                            <h3>Cash Wallet</h3>
                            <p>${parseFloat(data?.cashWallet).toFixed(2)}</p>
                        </div>
                    </div>
                    <p className='des'>Earn from referrals and games here. Transfer funds to AZ Wallet for purchases or to the Withdraw Wallet for withdrawals. No transfer fee applied.</p>
                    <button type='button' className='withdra-btn' onClick={e => { handleShowCash(e, 'cash') }}>Transfer</button>
                </div>
                <div className='card-wrapped theme-card'>
                    <div className='card-content'>
                        <div className='icon'>
                            <img src={imageMap['withdrawicon.png']} />
                        </div>
                        <div className='content'>
                            <h3>Withdraw Wallet</h3>
                            <p>${parseFloat(data?.withdrawWallet).toFixed(2)}</p>
                        </div>
                    </div>
                    <p className='des'>Holds the money you choose to withdraw. A 2% fee is deducted during withdrawals.</p>
                    <button type='button' className='withdra-btn' onClick={e => { handleShowWithdraw(e, 'withdraw') }}>View</button>
                </div>
            </div>
            <Modal
                show={cashModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className='joining-modal'
            >
                <Modal.Header closeButton></Modal.Header>
                <div className='content'>
                    <h4>Transfer amount to </h4>
                    <div className="form-check">
                        <label className="form-check-label" >
                            Amount
                            <input className="form-input" type="number" value={amount} onChange={e => { handleChangeAmount(e.target.value) }} />

                        </label>

                    </div>
                    <div className="form-check">

                        <label className="form-check-label" htmlFor="walletAz">
                            AZ Wallet
                            <input className="form-check-input" type="radio" name="wallet" value="az" id="walletAz" onChange={e => { handleWalletSelect(e.target.value) }} />
                        </label>
                    </div>
                    <div className="form-check">

                        <label className="form-check-label" htmlFor="walletWithdraw">
                            Withdraw Wallet
                            <input className="form-check-input" type="radio" name="wallet" value="withdraw" id="walletWithdraw" onChange={e => { handleWalletSelect(e.target.value) }} />
                        </label>
                    </div>

                    <div className="form-check">
                        <button className='btn-primary' disabled={cashTransferWallet && amount ? false : true} onClick={e => handleSubmitCash(e)}>Submit</button>
                    </div>


                </div>
            </Modal>

            <Modal
                show={AZModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className='joining-modal'
            >
                <Modal.Header closeButton></Modal.Header>
                <div className='content'>
                    <h4>Transfer amount to user</h4>
                    <div className="form-check">
                        <label className="form-check-label" >
                            Amount
                            <input className="form-input" type="number" value={amount} onChange={e => { handleChangeAmount(e.target.value) }} />

                        </label>

                    </div>
                    <div className="form-check">

                        <label className="form-check-label" htmlFor="walletAz">
                            Reciever's Email
                            <input className="form-input" type="text" name="recievers_email" value={recieversEmail} onChange={e => { handleChangeReciever(e.target.value) }} />
                        </label>
                    </div>

                    <div className="form-check">
                        <button className='btn-primary' disabled={recieversEmail && amount ? false : true} onClick={e => handleSubmitAZ(e)}>Submit</button>
                    </div>


                </div>
            </Modal>
        </>
    )
}

export default WalletCards