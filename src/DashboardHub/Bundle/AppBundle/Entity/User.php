<?php

namespace DashboardHub\Bundle\AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUser;

class User extends OAuthUser
{

    /**
     * @var int
     */
    protected $id;

    /**
     * @var ArrayCollection
     */
    protected $dashboards;

    /**
     * @param string $username
     */
    public function __construct($username)
    {
        parent::__construct($username);

        $this->dashboards = new ArrayCollection();
    }

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
     * @return Dashboard
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getDashboards()
    {
        return $this->dashboards;
    }

    /**
     * @param ArrayCollection $dashboards
     *
     * @return User
     */
    public function setDashboards(ArrayCollection $dashboards)
    {
        $this->dashboards = $dashboards;

        return $this;
    }
}
