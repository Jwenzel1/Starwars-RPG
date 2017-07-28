function Jedi(name){
  this.name = name;
  this.hp;
  this.attack;
  this.cattack;
  this.baseAttack;

  this.attackJedi = function(jedi){
    jedi.takeDamage(this.attack);
    logToInfo(this.name + " attacked " + jedi.getName() + " for " + this.attack + " damage");
    this.attack += this.baseAttack;

  }

  this.getHP = function(){
    return this.hp;
  }

  this.takeDamage = function(damage){
    var newHealth = this.hp - damage;
    if(newHealth <= 0) {
      this.hp = 0;
    }
    else{
      this.hp = newHealth;
    }
  }

  this.cAttack = function(jedi){
    jedis[jedi.getName()].takeDamage(this.cattack);
    logToInfo(this.name + " counter attacked " + jedi.getName() + " for " + this.cattack + " damage");
  }

  this.getName = function(){
    return this.name;
  }

  this.createJedi = function(){
    switch(this.name){
      case("Obiwan"):
        this.hp = 150;
        this.attack = 15;
        this.cattack = 20;
        break;
      case("Vader"):
        this.hp = 150;
        this.attack = 15;
        this.cattack = 20;
        break;
      case("Yoda"):
        this.hp = 150;
        this.attack = 15;
        this.cattack = 20;
        break;
      case("DarthMaul"):
        this.hp = 150;
        this.attack = 15;
        this.cattack = 20;
    }
    this.baseAttack = this.attack;
  }
}

function createTheJedi(){
  $.each(["Obiwan", "Vader", "Yoda", "DarthMaul"], function(index, element){
    var person = new Jedi(element);
    person.createJedi()
    jedis[element] = person;
  });
}

function updateHealth(selector){
  selector.each(function(index, element){
    $(this).find("p").html(jedis[$(this).attr("id")].getHP());
  });
}

function makeEnemiesClickable(){
  $("#enemiesToAttack .char").on("click", function(){
    var $fightclub = $("#fightSection");
    $fightclub.append($(this).off("click"));
    $("#enemiesToAttack .char").each(function(){
      $(this).off("click");
    });
  });
}

function logToInfo(string){
  $("#info").prepend("<br>").prepend(string);
}


//Entry Point
var jedis = {};
var player;
createTheJedi();
updateHealth($("#availableChar .char"));

$(document).ready(function(){
  $("#availableChar .char").on("click", function(){
    $("#yourChar").append($(this));
    $(this).off("click");
    $(this).css("background-color", "green");
    player = jedis[$(this).attr("id")];
    $("#availableChar .char").each(function(){
      $("#enemiesToAttack").append($(this));
      $(this).off("click");
      $(this).css({"background-color": "red", "border-color": "red"});
    });
    $("#availableChar").remove();
    makeEnemiesClickable();
  });

  $("#button").on("click", function(){
    var enemy = $("#fightSection").find(".char");
    if(enemy.length === 1){
      enemy = jedis[enemy.attr("id")];
      player.attackJedi(enemy);
      updateHealth($("#fightSection .char"));
      if(enemy.getHP() === 0){
        $("#fightSection").find(".char").remove();
        logToInfo(player.getName() + " defeated " + enemy.getName());
        makeEnemiesClickable();
      }
      console.log($("#fightSection").find(".char"));
      if($("#fightSection").find(".char").length === 1){
        enemy.cAttack(player);
        if(player.getHP() === 0){
          logToInfo("You died. LOSER");
          $("#button").off("click");
        }
        updateHealth($("#yourChar .char"));
      }
    }
  });
});
