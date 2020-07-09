import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    borderRadius: 15,
    margin: 100
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: "100px",
    margin: 25
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: 12
  },
}));

export default function CompanyCard({company}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  var { country, currency, exchange, finnhubIndustry, ipo, logo, marketCapitalization, name, phone, shareOutstanding, ticker, weburl } = company;
  const card_profile_data = {
    title: name,
    date: "September 14, 2016",
    img: {url: logo, title: name},
    text: finnhubIndustry,
    dropdown: {text: weburl}
  }
  const handle_expand_click = () => {
    setExpanded(!expanded);
  };

  const handle_favorite_click = (e) => {
    console.log(e.target.id)
  }

  return (
    <Card className={classes.root}>
      {/* <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     {ticker}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={card_profile_data.title || "title"}
      /> */}
      <CardMedia
        className={classes.media}
        image={card_profile_data.img.url}
        title={card_profile_data.img.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${card_profile_data.title} - ${card_profile_data.text}` || "text"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton id={ticker} aria-label="add to favorites" onClick={handle_favorite_click}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handle_expand_click}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {`Company: ${name}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Ticker: ${ticker}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Country: ${country}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Currency: ${currency}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Exchange: ${exchange}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`IPO: ${ipo}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Market Capitalization: ${marketCapitalization}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Share Outstanding: ${shareOutstanding}` || "dropdown text"}
          </Typography>
          <Typography paragraph>
            {`Website: ${weburl}` || "dropdown text"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


