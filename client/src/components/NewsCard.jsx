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



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    borderRadius: 15,
    margin: 100,
    backgroundColor: "lightgrey"
  },
  header: {
    fontSize: 5,
    margin: 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: 15,
    borderRadius: 15
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
  }
}));

export default function NewsCard({news}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  var { category, datetime, headline, id, image, related, source, summary, url } = news;
  const card_data = {
    title: headline,
    date: datetime,
    img: {url: image, title: name},
    text: "",
    dropdown: {text: summary}
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={card_data.img.url}
        title={card_data.img.title}
      />
      <CardHeader
        className={classes.header}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={card_data.title}
        subheader={card_data.date}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {card_data.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {card_data.dropdown.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}