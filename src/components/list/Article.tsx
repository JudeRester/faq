import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { AccordionActions, Button } from "@material-ui/core"
import Typography from "@material-ui/core/Typography";
import { ArticleProps } from "../../util/types";
import { ExpandMore } from "@material-ui/icons";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Article = (props: ArticleProps) => {
  //   const [expanded, setExpanded] = useState<string | false>(props.title);
  const setExpanded = props.setExpanded
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion square 
    expanded={props.expanded === props.title}
    onChange={handleChange(props.title)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={props.title + "-content"}
        id={props.title + "-header"}
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
           <div dangerouslySetInnerHTML={{__html:{props.content}}}></div>
        </Typography>
      </AccordionDetails>
      <AccordionActions>
          <Button variant="outlined" size="small" color="secondary">
            수정
          </Button>
        </AccordionActions>
    </Accordion>
  );
};

export default Article;
