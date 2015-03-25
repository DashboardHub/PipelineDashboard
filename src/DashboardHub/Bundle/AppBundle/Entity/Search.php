<?php

namespace DashboardHub\Bundle\AppBundle\Entity;

/**
 * Class Search
 * @package DashboardHub\Bundle\AppBundle\Entity
 */
class Search
{

    /**
     * @var string
     */
    protected $keyword;

    /**
     * @return string
     */
    public function getKeyword()
    {
        return $this->keyword;
    }

    /**
     * @param string $keyword
     *
     * @return Search
     */
    public function setKeyword($keyword)
    {
        $this->keyword = $keyword;

        return $this;
    }
}
