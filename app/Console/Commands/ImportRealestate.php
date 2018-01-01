<?php

namespace App\Console\Commands;

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
        return $this->parseREPage($data);
    }

    protected function parseREPage($data){
        preg_match_all("/<script[\s\S]*?>([\s\S]*?)<\/script>/", $data, $matches);
        $results = array();
        foreach($matches[1] as $match){
            if( strpos($match, "REA.resultsData =") !== false ) {
                $item = substr($match, strpos($match, "REA.resultsData =")+18, strlen($match));
                $results = json_decode($item, true);
            }
        }
        return $results;
    }

    protected function getResultData(){
        $totalResults = [];

        $url = "https://m.realestate.com.au/buy/with-4-bedrooms-between-0-650000-in-";
        $suburbs = config('realestate.suburbs');
        foreach($suburbs as $suburb){
            $url .= urlencode($suburb . ";");
        }
        $url .= "/list-1?activeSort=list-date&adcall=1514348785943";

        echo "Get $url \n";
        $data = $this->parseREPage( file_get_contents("dummy_data.html") ); //$this->getResultUrl($url);
        $total = $data['totalResultsCount'];
        $currentPage = $data['resolvedQuery']['page'];
        $pageSize = $data['resolvedQuery']['pageSize'];

        echo "On page $currentPage of $total results of $pageSize each page\n";
        return;
        $BreakOut = 20;
        while(isset($data['_links']) && isset($data['_links']['next'])){
            $nextLink = $data['_links']['next']['href'];
            echo "Get " . $nextLink . "\n";
            $data = $this->getResultUrl($nextLink);
            sleep(1);
            $BreakOut++;
        }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {
        $data = $this->getResultData();

        echo "Done\n";
    }
}
