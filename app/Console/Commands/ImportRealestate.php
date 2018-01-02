<?php

namespace App\Console\Commands;

use App\Models\Property;
use Illuminate\Console\Command;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class ImportRealestate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:realestate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import properties from RealEstate.com.au';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    protected function getResultUrl($url){
        $client = new Client(); //GuzzleHttp\Client
        $result = $client->get($url);

        $data = ($result->getBody()->getContents());
        return $data;
    }

    protected function getResultData(){
        $data = file_get_contents('all_properties.json' );
        return \json_decode($data, true);

        $totalResults = [];

        $suburbs = config('realestate.suburbs');
        $data = $this->getREQuery($suburbs);

        $total = $data['totalResultsCount'];
        $currentPage = $data['resolvedQuery']['page'];
        $pageSize = $data['resolvedQuery']['pageSize'];
        $totalRead = $pageSize;

        foreach($data['tieredResults'] as $key=>$list){
            $totalResults = array_merge($totalResults, $list['results']);
        }

        $BreakOut = 0;
        while($totalRead < $total){
            $currentPage++;
            $data = $this->getREQuery($suburbs, $currentPage);
            foreach($data['tieredResults'] as $key=>$list){
                $totalResults = array_merge($totalResults, $list['results']);
            }
            $totalRead += $pageSize;
            sleep(1);
            $BreakOut++;
            if($BreakOut >= 10) {
                break;
            }
        }
        return $totalResults;
    }

    protected function getREQuery($suburbs, $page = 1){
        $baseUrl = "https://services.realestate.com.au/services/listings/search?query=%s";
        $data = array(
            'channel' => 'buy',
            'localities' => $suburbs,
            'pageSize' => 50,
            'page' => $page,
            'sortType' => 'new-desc',
            'filters' => array(
                'priceRange' => array('minimum'=>'0', 'maximum' => '650000'),
                'bedroomsRange' => array('minimum'=> '4'),
                'surroundingSuburbs' => true
            )
        );
        $data = urlencode( json_encode($data) );
        $baseUrl = sprintf($baseUrl, $data);
        $response = $this->getResultUrl($baseUrl);
        file_put_contents("page_$page.json", $response);

        $data = \json_decode( $response, true );
        return $data;
    }

    protected function getImage($url, $toFile){
        $headers = ['Referer' => 'https://m.realestate.com.au'];
        $client = new Client(['headers'=>$headers]); //GuzzleHttp\Client
        $result = $client->get($url);
        $data = ($result->getBody()->getContents());

        file_put_contents($toFile, $data);
        return $data;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {

        $data = $this->getResultData();
        foreach($data as $property){
            Property::importRealEstateComAu($property);

        }
        echo "Done\n";
    }
}