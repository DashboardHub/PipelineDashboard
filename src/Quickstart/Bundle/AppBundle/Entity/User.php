<?php

namespace Quickstart\Bundle\AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;

/**
 * Class User
 * @package Quickstart\Bundle\AppBundle\Entity
 */
class User extends BaseUser
{

    /**
     * @var int
     */
    protected $id;

    /**
     * @var string
     */
    protected $firstname;

    /**
     * @var string
     */
    protected $lastname;

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
     * @return User
     */
    public function setId($id)
    {
        $this->id = (int) $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     *
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = (string) $firstname;

        return $this;
    }

    /**
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     *
     * @return User
     */
    public function setLastname($lastname)
    {
        $this->lastname = (string) $lastname;

        return $this;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getEmail();
    }
}
