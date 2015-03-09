<?php

namespace DashboardHub\Bundle\AppBundle\Form;

use DashboardHub\Bundle\AppBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * Class DashboardType
 * @package DashboardHub\Bundle\AppBundle\Form
 */
class DashboardType extends AbstractType
{

    /**
     * @var SecurityContextInterface
     */
    protected $securityContext;

    public function __construct(SecurityContextInterface $securityContext)
    {
        $this->securityContext = $securityContext;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'dashboard';
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'DashboardHub\Bundle\AppBundle\Entity\Dashboard'
            )
        );
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('repository')
            ->add(
                'theme',
                'choice',
                array(
                    'choices'  => array('default' => 'Default'),
                    'required' => true,
                )
            )
            ->add(
                'public',
                'radio',
                array(
                    'data'  => true,
                    'label' => 'Public Dashboard'
                )
            )
            ->add(
                'save',
                'submit',
                array('label' => 'Save')
            )
            ->addEventListener(
                FormEvents::POST_SET_DATA,
                array($this, 'onPostSetData')
            );
    }

    /**
     * @param FormEvent $event
     */
    public function onPostSetData(FormEvent $event)
    {
        $event->getData()
              ->setUser(
                  new User($this->securityContext->getToken()->getUser()->getUsername())
              );
        $event->getData()
              ->setUpdatedOn(
                  new \Datetime()
              );
    }
}
