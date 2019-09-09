export default function getRegions() {

    var ajaxCSRFsetup = function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    // Init variables.
    let $cityOptions = $('#city option');
    let $regionTag = $('#region');
    let $cityTag = $('#city');

    // Init ajax

    // Get all the city ids.
    function populateCityIds() {
        let city_ids = [];
        $cityOptions.each( (i,obj) => {
            city_ids.push($(obj).val());
        });
        return city_ids;
    }

    // create a new relative array which 
    // has as the key the city id and the value 
    // the regions for that city.
    //
    // Example => [ 
    //              '2' => ['3','4','9'],
    //              '3' => ['5','6','8'] 
    //            ]
    function populateRegions(city_ids,regions_obj) {
        let regions = [];
        city_ids.map(function(city_id){
            regions[city_id] = regions_obj.filter(function(item){
                return item['city_id'] == city_id; 
            });
        });
        return regions;
    }

    function createRegionTags(regions) {
        // gets the currently selected city id
        let $city_id =  $cityTag.children('option:selected').val();

        // restart the html
        $regionTag.html('');

        // Append the new elements on the region tag
        // based on the city id.
        regions[$city_id].map(function(region){
            $regionTag.append( '<option value="'+region['id']+'">'+region['name']+'</option>' );
        });
    }

    function init() {

        ajaxCSRFsetup();

        $.ajax({

            type:'GET',
            url:'/allRegions',
            dataType:'html',
    
            success: function(response){
                let regions_obj = JSON.parse(response);
                let city_ids = populateCityIds();
                let regions = populateRegions(city_ids , regions_obj);

                createRegionTags( regions );

                $cityTag.on('change',() => {
                    createRegionTags( regions );
                });
            }
    
        });
    }

    // Init
    init();
}