<template>
  <div id="app">
    <div class="container">
      <legend>Match: {{ match.matchNbr }}</legend>
    <table class="table">
      <thead>
        <tr>
          <th> <input type="checkbox" v-model="select_all" @click="selectPlayer"></th>
          <th>ID</th>
          <th>Player Name</th>
          <th>Credit</th>
          <th>Team Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in match.playerList">
          <td>
            <input type="checkbox" v-model="selected_player" :value="player"/>
          </td>
          <td>{{ player.playerId }}</td>
          <td>{{ player.playerName }}</td>
          <td>{{ player.credit }}</td>
          <td>{{ player.franchiseName }}</td>
          <td>
              <select class="form-control" v-model="player.dropDownValue">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
          </td>
        </tr>

        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <a  class="btn btn-default" @click="submit">Submit</a>
            <a  class="btn btn-default" @click="reset">Reset</a>
          </td>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      select_all:false,
      selected_player:[],
      match:[]
    }
  },
  mounted(){

   
    var _this=this;
    this.$api.get("active-match").then(function(response){
     
        _this.match=response.data.data;
     
    });
  },
  methods:{
    selectPlayer(){
      this.selected_player=[];
      if (!this.select_all) {
        const player_list=this.match.playerList;
				for (let i in player_list) {
          this.selected_player.push(player_list[i]);
				}
			}
    },
    submit(){
      var match_details={
        "matchId":this.match.matchId,
        "matchNbr":this.match.matchNbr,
        "playerList":[]

      };
      var _this=this;
      match_details.playerList=this.selected_player;
      this.$api.post(
        'team', 
        match_details
      ).then(function(response){
          const status= response.data.status;
          _this.$swal({
            icon:status==400?'warning':'success',
            title:response.data.message,

          });
          if(status==200){
            _this.reset();
          }
      });


    },
    reset(){
      this.select_all=false;
      this.selected_player=[];
      var _this=this
      for(let i in _this.match.playerList){
        _this.match.playerList[i].dropDownValue=null;
      }

    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
