var human = {};
console.log(human);
//This adds a property
human.name = "Nwokolo";
human.location = "Idaho";
human.likes = "Good Food";
human.getLocation = function(){
    return human.location;
};
human.getLikes = function(){
    return human.likes;
};
//this line adds a method
human.getName = function(){
    return human.name;
};

//Another way to do this is
var man = new Object();
console.log(man);
man.occupation = "Computer Scientist";
man.getOccupation = function(){
    return man.occupation;
};

var motivate = new Value("sum");
motivate.use();

//define the value function
var Value = function(Inspire){
    this.Inspire = Inspire;
    this.use = function(){
        return "We are meant to " + this.Inspire; + " each other";
    };

};
