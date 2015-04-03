<?php

namespace DashboardHub\Bundle\BeaconBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\Dashboard;

/**
 * Class Page
 * @package DashboardHub\Bundle\BeaconBundle\Entity
 */
class Page
{

    /**
     * @var int
     */
    protected $id;

    /**
     * @var Dashboard
     */
    protected $dashboard;

    /**
     * @var string
     */
    protected $url = '';

    /**
     * @var string
     */
    protected $ruleset = '';

    /**
     * @var int
     */
    protected $pageSize = 0;

    /**
     * @var int
     */
    protected $score = 0;

    /**
     * @var int
     */
    protected $requests = 0;

    /**
     * @var int
     */
    protected $pageLoadTime = 0;

    /**
     * @var string
     */
    protected $build = '';

    /**
     * @var \Datetime
     */
    protected $createdOn;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     *
     * @return Page
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return Dashboard
     */
    public function getDashboard()
    {
        return $this->dashboard;
    }

    /**
     * @param Dashboard $dashboard
     *
     * @return Page
     */
    public function setDashboard($dashboard)
    {
        $this->dashboard = $dashboard;

        return $this;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     *
     * @return Page
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return string
     */
    public function getRuleset()
    {
        return $this->ruleset;
    }

    /**
     * @param string $ruleset
     *
     * @return Page
     */
    public function setRuleset($ruleset)
    {
        $this->ruleset = $ruleset;

        return $this;
    }

    /**
     * @return int
     */
    public function getPageSize()
    {
        return $this->pageSize;
    }

    /**
     * @param int $pageSize
     *
     * @return Page
     */
    public function setPageSize($pageSize)
    {
        $this->pageSize = $pageSize;

        return $this;
    }

    /**
     * @return int
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param int $score
     *
     * @return Page
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * @return int
     */
    public function getRequests()
    {
        return $this->requests;
    }

    /**
     * @param int $requests
     *
     * @return Page
     */
    public function setRequests($requests)
    {
        $this->requests = $requests;

        return $this;
    }

    /**
     * @return int
     */
    public function getPageLoadTime()
    {
        return $this->pageLoadTime;
    }

    /**
     * @param int $pageLoadTime
     *
     * @return Page
     */
    public function setPageLoadTime($pageLoadTime)
    {
        $this->pageLoadTime = $pageLoadTime;

        return $this;
    }

    /**
     * @return string
     */
    public function getBuild()
    {
        return $this->build;
    }

    /**
     * @param string $build
     *
     * @return Page
     */
    public function setBuild($build)
    {
        $this->build = $build;

        return $this;
    }

    /**
     * @return \Datetime
     */
    public function getCreatedOn()
    {
        return $this->createdOn;
    }

    /**
     * @param \Datetime $createdOn
     *
     * @return Page
     */
    public function setCreatedOn($createdOn)
    {
        $this->createdOn = $createdOn;

        return $this;
    }

}
