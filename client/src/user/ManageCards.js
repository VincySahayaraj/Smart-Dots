import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../globalStates';
import UserLayout from './Layout/UserLayout'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {getCardDetailsById, updateCardStatus} from './apiUser'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {API} from '../config'
import { Badge } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { fetchConfig } from '../auth/fetchInterceptor';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const ManageCards = () => {

    const [authState] = useContext(AuthContext);

    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const [ error, setError] = useState("");

    const [cards, setCards] = useState([]);

    const loadCards = () => {
        getCardDetailsById({userId:authState._id}).then(data => {
            if(data.error){
                setError(data.error)
                setOpen(false)
            }
            else {
                setCards(data);
                setError('');
                setOpen(false)
            }
        })
    }

    useEffect(() => {
        loadCards()
    },[])


    const showCards = () => {
        return (
            <div className="row">
          
                {cards.map((p,i) => ( 
                    <div key={i} className="col-md-6 px-0 mb-3">
                      <div className="col-md-8 bord-line">

                        <div className="row">
                           
                            <div className="col-md-8 py-3 wid-60-per-in">

                                <p><b>Card No : </b>xxxx xxxx xxxx {p.card_no}</p>
                                <p><b>Exp month/year : </b>{p.exp_month} / {p.exp_year}</p>
                                <p><b>Card Type : </b>{p.brand}</p>
                                <p><b>Status : </b><Badge pill variant="success">Active</Badge></p>
                            </div>
                            <div className="col-md-3 pt-3 text-right">

                                    <Tooltip title="Delete this card">
                                        <IconButton aria-label="delete">
                                            <DeleteIcon onClick={() => destroy(p._id,p.payment_method)} />
                                        </IconButton>
                                    </Tooltip>
                                    
                            </div>
                        </div>
                    </div>
                </div>

                
                ))}
        </div>
        )
    }

    const destroy = async (cardId,paymentID) => {

        if(window.confirm("Do you want to delete this card?"))
        {
            setOpen(true);

                const deleteCard = await fetch(`${API}/detach/payment/method`, {
                    method:'POST',
                    headers:fetchConfig,
                    body: JSON.stringify({ 
                        payment_method: paymentID,
                        userid: authState._id
                      })
                  });
                  
                  const cardRes = await deleteCard.json();

                if(cardRes){

                    let statusUpdate = await updateCardStatus({id:cardId, status:2})

                    if(statusUpdate.status === 2){
                        loadCards();
                    }
                }
                 
        }

    }

    const showNotfound = () => {
        return (

            <div className="col-md-12 px-0">
                  <div className="col-md-12" style={{backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px'}}>
                      <br/>
                       <h4 style={{textAlign:'center',color:'red'}}>Card Not found!!</h4>
                  </div>
              </div>

        )
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">{error}</h3>
        }
    };


    return (
        <UserLayout>

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ color:'#19a6dd', textAlign:'center'}}>Manage Cards</h2>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5><Link className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" style={{borderRadius: '20px'}} to={`/user/add/card`}>Add New Card</Link></h5>
                    </div>
                    <div className="col-md-12">
                        <br/>
                        {showError()}
                        {!open && (cards.length>=1 ? showCards() : showNotfound())}
                    </div>
                    
                </div>
            </div>

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop> 
            
        </UserLayout>
    )
}

export default ManageCards
