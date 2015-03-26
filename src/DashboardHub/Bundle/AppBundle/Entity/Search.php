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
    protected $query;

    /**
     * @return string
     */
    public function getQuery()
    {
        return $this->query;
    }

    /**
     * @param string $query
     *
     * @return Search
     */
    public function setQuery($query)
    {
        $this->query = $query;

        return $this;
    }
}
