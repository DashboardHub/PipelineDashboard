<?php

namespace DashboardHub\Bundle\AppBundle\Entity;

/**
 * Class AuthenticationAudit
 * @package DashboardHub\Bundle\AppBundle\Entity
 */
class AuthenticationAudit
{

    /**
     * @var int
     */
    protected $id;

    /**
     * @var User
     */
    protected $user;

    /**
     * @var \Datetime
     */
    protected $createdOn;

    public function __construct()
    {
        $this->createdOn = new \DateTime();
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
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     *
     * @return Dashboard
     */
    public function setUser(User $user)
    {
        $this->user = $user;

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
     * @return Dashboard
     */
    public function setCreatedOn(\Datetime $createdOn)
    {
        $this->createdOn = $createdOn;

        return $this;
    }
}
