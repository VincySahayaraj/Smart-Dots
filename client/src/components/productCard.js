import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {API} from '../config'
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width:300
  },
  buynow:{
    //   backgroundColor:'gold',
        fontWeight:'bolder',
    }
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${API}/product/photo/${props.value._id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.value.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.value.description}
          </Typography>
          <Typography>
              ${props.value.sale_price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.buynow}>
          Buy Now
        </Button>
        <Link to={`/product-details/${props.value._id}`}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
